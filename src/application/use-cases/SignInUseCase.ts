import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '../../domain/@shared/exceptions/UnauthorizedException';
import { ISignInInputDto, ISignInOutputDto } from '../dtos/SignInDto';
import { IEncryptAdapter } from '../interfaces/adapters/IEncryptAdapter';
import { ITokenAdapter } from '../interfaces/adapters/ITokenAdapter';
import { IUsersRepository } from '../interfaces/repositories/IUsersRepository';
import { ISignInUseCase } from '../interfaces/use-cases/ISignInUseCase';

@Injectable()
export class SignInUseCase implements ISignInUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly encryptAdapter: IEncryptAdapter,
    private readonly tokenAdapter: ITokenAdapter,
  ) {}
  async execute(input: ISignInInputDto): Promise<ISignInOutputDto> {
    const user = await this.usersRepository.findByEmail(input.email);

    if (!user) throw new UnauthorizedException();

    const isMatchPassword = await this.encryptAdapter.compareHash(
      input.password,
      user.password,
    );

    if (!isMatchPassword) throw new UnauthorizedException();

    const { token, expiresAt } = await this.tokenAdapter.sing({
      user: {
        id: user.id.value,
        email: user.email,
      },
    });

    return {
      token,
      expiresAt,
    };
  }
}
