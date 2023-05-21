import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';
import { ISignInInputDto } from '../../../application/dtos/SignInDto';

export class SignInInputVM {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The unique email of the user',
    example: 'john.doe@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description: 'The password of the user',
    example: 'strong-passw#ord~',
  })
  password: string;

  static fromViewModel(vm: SignInInputVM): ISignInInputDto {
    return {
      email: vm.email,
      password: vm.password,
    };
  }
}
