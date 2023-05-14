import { UniqueId } from '../../domain/value-objects/UniqueId';

export interface IUpdateUserDto {
  id: UniqueId;
  name?: string;
  email?: string;
  password?: string;
}
