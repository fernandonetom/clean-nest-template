import { UniqueId } from '../../value-objects/UniqueId';

export interface IEntityPropsDto {
  id?: UniqueId;
  createdAt?: Date;
  updatedAt?: Date;
}
