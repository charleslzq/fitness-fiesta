import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PasswordAuthentication } from './auth.entity';
import { Model } from 'mongoose';
import { UserService } from '../users/users.service';
import {
  LoginWithEmailRequest,
  SignUpWithEmailRequest,
  LoginResponse,
} from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(PasswordAuthentication.name)
    private readonly passwordAuthModel: Model<PasswordAuthentication>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async existByEmail(email: string): Promise<boolean> {
    return this.passwordAuthModel
      .exists({
        email: email,
      })
      .then((result) => result != null);
  }

  async signUpByEmail(request: SignUpWithEmailRequest): Promise<LoginResponse> {
    const emailExists = await this.existByEmail(request.email);
    if (emailExists) {
      throw new BadRequestException('Email exists');
    }

    const [user, hashedPassword] = await Promise.all([
      this.userService.create(request.username),
      this.hashPassword(request.password),
    ]);
    await this.passwordAuthModel.create({
      email: request.email,
      password: hashedPassword,
      user: user,
    });

    return this.createLoginResponseForUser(user);
  }

  async loginWithEmail(request: LoginWithEmailRequest): Promise<LoginResponse> {
    const auth = await this.passwordAuthModel
      .findOne({
        email: request.email,
      })
      .populate('user');
    if (auth === null) {
      throw new BadRequestException("User doesn't exist");
    }
    const passwordMatch = await bcrypt.compare(request.password, auth.password);
    if (!passwordMatch) {
      throw new BadRequestException('Invalid password');
    }

    return this.createLoginResponseForUser(auth.user);
  }

  private createLoginResponseForUser(user: User): LoginResponse {
    return {
      user: user,
      token: this.jwtService.sign({
        sub: user._id,
        username: user.username,
      }),
    };
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
