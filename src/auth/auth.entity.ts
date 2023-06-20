import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Types} from "mongoose";


@Schema()
export class PasswordAuthentication {
  _id: mongoose.Types.ObjectId;
  type: string;
  user_id: mongoose.Types.ObjectId;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  @Prop({type: String, required: true})
  email: string;

  @Prop({type: String, required: true})
  password: string;
}

@Schema({
  discriminatorKey: 'type',
  timestamps: true,
})
export class Authentication {
  @Prop({type: Types.ObjectId, default: () => new mongoose.Types.ObjectId()})
  _id: mongoose.Types.ObjectId;

  @Prop({type: String, required: true, enum: [PasswordAuthentication.name]})
  type: string;

  @Prop({type: Types.ObjectId, required: true})
  user_id: mongoose.Types.ObjectId;

  @Prop({type: Date})
  readonly createdAt: Date;

  @Prop({type: Date})
  readonly updatedAt: Date;
}

export const PasswordAuthenticationSchema = SchemaFactory.createForClass(PasswordAuthentication);
export const AuthenticationSchema = SchemaFactory.createForClass(Authentication);


