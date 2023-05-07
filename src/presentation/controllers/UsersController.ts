import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { UserUseCases } from '../../application/use-cases/UserUseCases';
import { UserVM } from '../view-models/users/UserVM';
import { BadRequestError } from '../errors/BadRequestError';
import { CreateUserVM } from '../view-models/users/CreateUserVM';
import { UnprocessableEntityError } from '../errors/UnprocessableEntityError';
import { InternalServerError } from '../errors/InternalServerError';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersUseCases: UserUseCases) {}

  @Post()
  @ApiOperation({
    summary: 'Create an user',
  })
  @ApiCreatedResponse({ type: UserVM, status: HttpStatus.CREATED })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while creating user',
    type: UnprocessableEntityError,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerError,
  })
  async createUser(@Body() createUser: CreateUserVM): Promise<UserVM> {
    const newUser = await this.usersUseCases.create(
      CreateUserVM.fromViewModel(createUser),
    );

    return UserVM.toViewModel(newUser);
  }
}
