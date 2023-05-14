import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import { User } from '../../../domain/entities/User';

export class UpdateUserVM {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    description: 'The unique email of the user',
    example: 'john.doe@gmail.com',
  })
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @ApiProperty({
    description: 'The password of the user',
    example: 'strong-passw#ord~',
  })
  password: string;

  static fromViewModel(vm: UpdateUserVM): User {
    return new User({
      name: vm.name,
      email: vm.email,
      password: vm.password,
    });
  }
}
