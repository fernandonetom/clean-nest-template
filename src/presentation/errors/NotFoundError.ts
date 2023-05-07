import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  @ApiProperty({
    description: 'The error status.',
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: HttpStatus = HttpStatus.NOT_FOUND;
}
