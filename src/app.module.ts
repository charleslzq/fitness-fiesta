import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, GlobalEventHandler } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('mongo'),
      }),
    }),
    CqrsModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService, GlobalEventHandler],
})
export class AppModule {}
