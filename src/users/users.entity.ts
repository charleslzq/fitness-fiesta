import {Prop} from "@nestjs/mongoose";
import mongoose, {Types} from "mongoose";

export class User {
  @Prop({type: Types.ObjectId, default: () => new mongoose.Types.ObjectId()})
  _id: mongoose.Types.ObjectId;

  @Prop({type: String, required: true, index: true})
  username: string;
}