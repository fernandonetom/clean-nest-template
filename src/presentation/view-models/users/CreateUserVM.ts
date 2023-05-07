import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';
import { User } from '../../../domain/entities/User';

export class CreateUserVM {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

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

  static fromViewModel(vm: CreateUserVM): User {
    return new User({
      name: vm.name,
      email: vm.email,
      password: vm.password,
    });
  }
}
