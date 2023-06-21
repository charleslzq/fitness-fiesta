import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Event } from './event/event.schema';
import { SaveEventCommand } from './event/event.command';

@Injectable()
export class AppService {
  constructor(private readonly commandBus: CommandBus) {}

  getHello(): string {
    return 'Hello World!';
  }

  async parseFitFile(input: Buffer) {
    const FitSDK = await import('@garmin-fit/sdk');
    const stream = FitSDK.Stream.fromBuffer(input);
    console.log('isFIT (static method): ' + FitSDK.Decoder.isFIT(stream));

    const decoder = new FitSDK.Decoder(stream);
    console.log('isFIT (instance method): ' + decoder.isFIT());
    console.log('checkIntegrity: ' + decoder.checkIntegrity());

    const { messages, errors } = decoder.read();

    console.log(errors);
    await this.commandBus.execute(
      new SaveEventCommand('fit-file-parsed', null, messages),
    );
  }
}

@EventsHandler(Event)
export class GlobalEventHandler implements IEventHandler<Event> {
  private readonly logger = new Logger(GlobalEventHandler.name);

  handle(event: Event): any {
    this.logger.log(event);
  }
}
