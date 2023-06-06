import { Injectable } from '@nestjs/common';
import { EventService } from './event/event.service';

@Injectable()
export class AppService {
  constructor(private readonly eventService: EventService) {}
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
    console.log(messages);
  }
}
