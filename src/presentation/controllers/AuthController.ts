import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignInUseCase } from '../../application/use-cases/SignInUseCase';
import { SignInOutputVM } from '../view-models/auth/SignInOutputVM';
import { SignInInputVM } from '../view-models/auth/SignInInputVM';
import { UnauthorizedError } from '../errors/UnauthorizedError';

@ApiTags('Auth')
@Controller('auth')
@ApiUnauthorizedResponse({
  description: 'Invalid token/credentials',
  type: UnauthorizedError,
})
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('login')
  @ApiOperation({
    summary: 'Create an access token',
  })
  @ApiOkResponse({ type: SignInOutputVM })
  async login(@Body() signIn: SignInInputVM): Promise<SignInOutputVM> {
    const signInOutput = await this.signInUseCase.execute(
      SignInInputVM.fromViewModel(signIn),
    );

    return SignInOutputVM.toViewModel(signInOutput);
  }
}
