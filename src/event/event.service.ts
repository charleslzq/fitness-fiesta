import { Injectable } from '@nestjs/common';
import { Event } from './event.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  async save(type: string, data: any) {
    await this.eventModel.create({
      _id: new mongoose.Types.ObjectId(),
      type: type,
      data: data,
    });
  }
}
