import { User } from '../users/users.entity';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field({ nullable: false })
  token: string;

  @Field(() => User, { nullable: false })
  user: User;
}

@ArgsType()
export class EmailRequest {
  @Field()
  @IsEmail({}, { message: 'invalid email address' })
  email: string;
}

@ArgsType()
export class LoginWithEmailRequest extends EmailRequest {
  @Field()
  @IsString()
  @MinLength(8, { message: 'password should contain at least 8 characters' })
  password: string;
}

@ArgsType()
export class SignUpWithEmailRequest extends LoginWithEmailRequest {
  @Field()
  @IsString()
  @MinLength(5, { message: 'username should contain at least 5 characters' })
  username: string;
}
