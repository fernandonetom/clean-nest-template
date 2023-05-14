import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { UserUseCases } from '../../application/use-cases/UserUseCases';
import { UserVM } from '../view-models/users/UserVM';
import { BadRequestError } from '../errors/BadRequestError';
import { CreateUserVM } from '../view-models/users/CreateUserVM';
import { UnprocessableEntityError } from '../errors/UnprocessableEntityError';
import { InternalServerError } from '../errors/InternalServerError';
import { UniqueIdVM } from '../view-models/value-objects/UniqueIdVM';
import { NotFoundError } from '../errors/NotFoundError';
import { UpdateUserVM } from '../view-models/users/UpdateUserVM';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersUseCases: UserUseCases) {}

  @Post()
  @ApiOperation({
    summary: 'Create an user',
  })
  @ApiCreatedResponse({ type: UserVM })
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

  @Get(':id')
  @ApiOperation({
    summary: 'Find an user',
  })
  @ApiOkResponse({ type: UserVM })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  @ApiNotFoundResponse({
    description: "The request object wasn't found",
    type: NotFoundError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while creating user',
    type: UnprocessableEntityError,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerError,
  })
  async findUser(@Param('id') uniqueId: UniqueIdVM): Promise<UserVM> {
    const user = await this.usersUseCases.findById(
      UniqueIdVM.fromViewModel(uniqueId),
    );

    return UserVM.toViewModel(user);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an user',
  })
  @ApiNoContentResponse()
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  @ApiNotFoundResponse({
    description: "The request object wasn't found",
    type: NotFoundError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while creating user',
    type: UnprocessableEntityError,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerError,
  })
  async updateUser(
    @Param('id') uniqueId: UniqueIdVM,
    updateUser: UpdateUserVM,
  ): Promise<void> {
    await this.usersUseCases.update({
      id: UniqueIdVM.fromViewModel(uniqueId),
      ...updateUser,
    });
  }
}
