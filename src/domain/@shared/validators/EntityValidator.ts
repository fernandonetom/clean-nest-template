import { IsDate, IsOptional } from 'class-validator';
import { IEntityPropsDto } from '../dtos/EntityDto';

export class EntityRules {
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;

  constructor(props: IEntityPropsDto) {
    Object.assign(this, props);
  }
}
