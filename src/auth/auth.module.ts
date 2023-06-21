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

@Module({
  providers: [AuthService, AuthResolver],
  imports: [
    UsersModule,
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
