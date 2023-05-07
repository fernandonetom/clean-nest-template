import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BaseError {
  @ApiProperty({
    description: 'The error status.',
    example: HttpStatus.BAD_REQUEST,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    description: 'The error message.',
    example: 'Some error',
  })
  error: string;

  @ApiProperty({
    description: 'The error details.',
    example: ['name should not be empty', 'email should not be empty'],
  })
  message: string[];
}
