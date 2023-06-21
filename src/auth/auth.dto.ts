import { User } from '../users/users.entity';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginResponse {
  token: string;
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
