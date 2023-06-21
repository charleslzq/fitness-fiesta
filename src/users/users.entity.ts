import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import {Field, ObjectType} from '@nestjs/graphql';
import {ObjectIdScalar} from "../helper/scalars";

@ObjectType()
@Schema({
  timestamps: true,
})
export class User {
  @Field(type => ObjectIdScalar, {nullable: false})
  @Prop({ type: Types.ObjectId, default: () => new mongoose.Types.ObjectId() })
  _id: mongoose.Types.ObjectId;

  @Field({nullable: false})
  @Prop({ type: String, required: true, index: true })
  username: string;

  @Field({nullable: false})
  @Prop({ type: Date })
  readonly createdAt: Date;

  @Field({nullable: true})
  @Prop({ type: Date })
  readonly updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
