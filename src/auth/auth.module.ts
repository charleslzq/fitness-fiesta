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

@Module({
  providers: [AuthService, AuthResolver],
  imports: [
    UsersModule,
    JwtModule,
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
