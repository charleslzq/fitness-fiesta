import {Event, EventRoot} from './event.schema';
import {InjectModel} from '@nestjs/mongoose';
import mongoose, {Model} from 'mongoose';
import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {SaveEventCommand} from './event.command';

@CommandHandler(SaveEventCommand)
export class SaveEventCommandHandler
    implements ICommandHandler<SaveEventCommand> {
  constructor(
      @InjectModel(Event.name) private readonly eventModel: Model<Event>,
      private readonly publisher: EventPublisher,
  ) {
  }

  async getEvent(command: SaveEventCommand): Promise<Event> {
    if (command._id) {
      return this.eventModel.findByIdAndUpdate(command._id, command, {
        new: true,
      });
    }

    return await this.eventModel.create({
      _id: new mongoose.Types.ObjectId(),
      ...command,
    });
  }

  async execute(command: SaveEventCommand) {
    const event = await this.getEvent(command);
    const eventRoot = this.publisher.mergeObjectContext(new EventRoot(event));
    eventRoot.saveEvent();
    eventRoot.commit();
  }
}
