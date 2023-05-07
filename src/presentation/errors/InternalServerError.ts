import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { BaseError } from './BaseError';

export class InternalServerError extends BaseError {
  @ApiProperty({
    description: 'The error status.',
    example: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

  @ApiProperty({
    description: 'The error message.',
    example: 'Internal Server Error',
  })
  error: string;

  @ApiProperty({
    description: 'The error details.',
    example: ['database connection fails'],
  })
  message: string[];
}
