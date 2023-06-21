import { User } from '../users/users.entity';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field({ nullable: false })
  token: string;

  @Field((type) => User, { nullable: false })
  user: User;
}

export class SignUpWithEmailRequest {
  @IsEmail()
  email: string;

  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(8)
  passwordConfirm: string;
}

export class LoginWithEmailRequest {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
