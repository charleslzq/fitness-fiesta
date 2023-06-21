import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {EmailRequest} from "./auth.dto";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Boolean)
  async doesEmailExist(@Args() request: EmailRequest): Promise<boolean> {
    return this.authService.existByEmail(request.email);
  }
}
