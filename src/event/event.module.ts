import {SaveEventCommandHandler} from './event.handler';
import {Module} from '@nestjs/common';
import {Event, EventSchema} from './event.schema';
import {MongooseModule} from '@nestjs/mongoose';
import {CqrsModule} from '@nestjs/cqrs';

@Module({
  controllers: [],
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{name: Event.name, schema: EventSchema}]),
  ],
  providers: [SaveEventCommandHandler],
  exports: [],
})
export class EventModule {
}
