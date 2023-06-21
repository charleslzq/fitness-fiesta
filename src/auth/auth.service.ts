import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PasswordAuthentication } from './auth.entity';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(PasswordAuthentication.name)
    private readonly passwordAuthModel: Model<PasswordAuthentication>,
  ) {}
}
