import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Types} from 'mongoose';
import {AggregateRoot} from '@nestjs/cqrs';

@Schema({
  timestamps: true,
})
export class Event {
  @Prop({type: Types.ObjectId, default: () => new mongoose.Types.ObjectId()})
  _id: mongoose.Types.ObjectId;

  @Prop({type: String, required: true, index: true, lowercase: true})
  type: string;

  @Prop({type: {}})
  meta: any;

  @Prop({type: {}})
  data: any;

  @Prop({type: Date})
  readonly createdAt: Date;

  @Prop({type: Date})
  readonly updatedAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);

export class EventRoot extends AggregateRoot<Event> {
  event: Event;

  constructor(event: Event) {
    super();

    this.event = event;
  }

  saveEvent() {
    this.apply(this.event);
  }
}
