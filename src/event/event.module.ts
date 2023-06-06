import { EventService } from './event.service';
import { Module } from '@nestjs/common';
import { Event, EventSchema } from './event.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [],
  providers: [EventService],
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  exports: [EventService],
})
export class EventModule {}
