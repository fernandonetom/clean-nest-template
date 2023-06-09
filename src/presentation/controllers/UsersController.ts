import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
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
  ApiUnauthorizedResponse,
  ApiSecurity,
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
import { Public } from '../../infrastructure/nestjs/shared/decorators/IsPublicDecorator';
import { UnauthorizedError } from '../errors/UnauthorizedError';

@ApiTags('Users')
@Controller('users')
@ApiUnauthorizedResponse({
  description: 'Invalid token/credentials',
  type: UnauthorizedError,
})
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
export class UsersController {
  constructor(private readonly usersUseCases: UserUseCases) {}
  @Public()
  @Post()
  @ApiOperation({
    summary: 'Create an user',
  })
  @ApiCreatedResponse({ type: UserVM })
  async createUser(@Body() createUser: CreateUserVM): Promise<UserVM> {
    const newUser = await this.usersUseCases.create(
      CreateUserVM.fromViewModel(createUser),
    );

    return UserVM.toViewModel(newUser);
  }

  @Get(':id')
  @ApiSecurity('bearer')
  @ApiOperation({
    summary: 'Find an user',
  })
  @ApiOkResponse({ type: UserVM })
  @ApiNotFoundResponse({
    description: "The request object wasn't found",
    type: NotFoundError,
  })
  async findUser(@Param() uniqueId: UniqueIdVM): Promise<UserVM> {
    const user = await this.usersUseCases.findById(
      UniqueIdVM.fromViewModel(uniqueId),
    );

    return UserVM.toViewModel(user);
  }

  @Put(':id')
  @ApiSecurity('bearer')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Update an user',
  })
  @ApiNoContentResponse()
  @ApiNotFoundResponse({
    description: "The request object wasn't found",
    type: NotFoundError,
  })
  async updateUser(
    @Param() uniqueId: UniqueIdVM,
    @Body() updateUser: UpdateUserVM,
  ): Promise<void> {
    await this.usersUseCases.update({
      id: UniqueIdVM.fromViewModel(uniqueId),
      ...updateUser,
    });
  }
}
