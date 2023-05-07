import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { BaseError } from './BaseError';

export class UnprocessableEntityError extends BaseError {
  @ApiProperty({
    description: 'The error status.',
    example: HttpStatus.UNPROCESSABLE_ENTITY,
  })
  statusCode: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
}
