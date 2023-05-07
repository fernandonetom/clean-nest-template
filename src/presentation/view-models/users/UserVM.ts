import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../domain/entities/User';

export class UserVM {
  @ApiProperty({
    description: 'The id of the user',
    example: '9adc7c1d-fd7e-48b5-b803-0be7613390bd',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The unique email of the user',
    example: 'john.doe@gmail.com',
  })
  email: string;

  @ApiProperty({ description: 'The user date creation' })
  createdAt: Date;

  @ApiProperty({ description: 'The date of the last user update' })
  updatedAt: Date;

  static toViewModel(user: User): UserVM {
    const userVm = new UserVM();

    userVm.id = user.id.value;
    userVm.name = user.name;
    userVm.email = user.email;
    userVm.createdAt = user.createdAt;
    userVm.updatedAt = user.updatedAt;

    return userVm;
  }
}
