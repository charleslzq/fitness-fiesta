import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  EmailRequest,
  LoginResponse,
  LoginWithEmailRequest,
  SignUpWithEmailRequest,
} from './auth.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Boolean)
  async doesEmailExist(@Args() request: EmailRequest): Promise<boolean> {
    return this.authService.existByEmail(request.email);
  }

  @Mutation(() => LoginResponse)
  async loginWithEmail(
    @Args() request: LoginWithEmailRequest,
  ): Promise<LoginResponse> {
    return this.authService.loginWithEmail(request);
  }

  @Mutation(() => LoginResponse)
  async signUpByEmail(
    @Args() request: SignUpWithEmailRequest,
  ): Promise<LoginResponse> {
    return this.authService.signUpByEmail(request);
  }
}
