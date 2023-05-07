import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
  @ApiProperty({
    description: 'The error status.',
    example: HttpStatus.BAD_REQUEST,
  })
  statusCode: HttpStatus = HttpStatus.BAD_REQUEST;
}
