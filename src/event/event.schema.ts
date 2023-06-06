import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Event {
  @Prop({ type: Types.ObjectId })
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true, index: true, lowercase: true })
  type: string;

  @Prop({ type: Map<String, any> })
  data: Map<string, any>;

  @Prop({ type: Date })
  readonly createdAt: Date;

  @Prop({ type: Date })
  readonly updatedAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.post('save', (event) => {
  console.log('%s has been saved', event._id);
});
