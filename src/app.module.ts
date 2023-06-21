import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, GlobalEventHandler } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ObjectIdScalar } from './helper/scalars';

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
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        playground: config.get<string>('env') === 'dev',
        autoSchemaFile: true,
        sortSchema: true,
      }),
    }),
    CqrsModule,
    EventModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, GlobalEventHandler, ObjectIdScalar],
})
export class AppModule {}
