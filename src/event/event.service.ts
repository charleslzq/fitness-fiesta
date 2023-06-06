import { Injectable } from '@nestjs/common';
import { Event } from './event.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  async save(type: string, data: Map<string, any>) {
    await this.eventModel.create({
      type: type,
      data: data,
    });
  }
}
