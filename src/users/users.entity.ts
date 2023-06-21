import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ type: Types.ObjectId, default: () => new mongoose.Types.ObjectId() })
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true, index: true })
  username: string;

  @Prop({ type: Date })
  readonly createdAt: Date;

  @Prop({ type: Date })
  readonly updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
