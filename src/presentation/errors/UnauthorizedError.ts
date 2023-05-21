import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { BaseError } from './BaseError';

export class UnauthorizedError extends BaseError {
  @ApiProperty({
    description: 'Unauthorized',
    example: HttpStatus.UNAUTHORIZED,
  })
  statusCode: HttpStatus = HttpStatus.UNAUTHORIZED;
}
