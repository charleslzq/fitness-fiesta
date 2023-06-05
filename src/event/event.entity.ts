import { modelOptions, prop } from '@typegoose/typegoose';
import { IEvent } from './event.type';
import mongoose from 'mongoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Event implements IEvent {
  @prop({
    type: mongoose.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  })
  id: string;

  @prop({ type: String, required: true })
  type: string;

  @prop({ type: Map, required: false, default: () => new Map() })
  data: Map<string, unknown>;

  @prop({ type: Date, required: false })
  readonly createdAt: Date;

  @prop({ type: Date, required: false })
  readonly updatedAt: Date;
}
