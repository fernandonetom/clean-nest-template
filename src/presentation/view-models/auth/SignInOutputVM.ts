import { ApiProperty } from '@nestjs/swagger';
import { ISignInOutputDto } from '../../../application/dtos/SignInDto';

export class SignInOutputVM {
  @ApiProperty({
    description: 'Access Token',
    example: 'asdsadjkashdjas.sdjksahdkjasd.asiqwjeiow',
  })
  token: string;

  @ApiProperty({
    description: 'The token time expiration',
    example: 1684679610579,
  })
  expiresAt: number;

  static toViewModel(output: ISignInOutputDto): SignInOutputVM {
    const vm = new SignInOutputVM();

    vm.token = output.token;
    vm.expiresAt = output.expiresAt;

    return vm;
  }
}
