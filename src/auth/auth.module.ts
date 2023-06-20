import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {MongooseModule} from "@nestjs/mongoose";
import {
  Authentication,
  AuthenticationSchema,
  PasswordAuthentication,
  PasswordAuthenticationSchema
} from "./auth.entity";

@Module({
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Authentication.name,
        schema: AuthenticationSchema,
        discriminators: [
          {name: PasswordAuthentication.name, schema: PasswordAuthenticationSchema}
        ]
      }
    ])
  ]
})
export class AuthModule {
}
