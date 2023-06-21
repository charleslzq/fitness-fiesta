import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Authentication,
  AuthenticationSchema,
  PasswordAuthentication,
  PasswordAuthenticationSchema,
} from './auth.entity';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, AuthResolver],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('jwtSecret'),
        signOptions: {
          expiresIn: '10d',
        },
      }),
    }),
    MongooseModule.forFeature([
      {
        name: Authentication.name,
        schema: AuthenticationSchema,
        discriminators: [
          {
            name: PasswordAuthentication.name,
            schema: PasswordAuthenticationSchema,
          },
        ],
      },
    ]),
  ],
})
export class AuthModule {}
