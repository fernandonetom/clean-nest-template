import { IEntityPropsDto } from '../@shared/dtos/EntityDto';

export interface IUserPropsDto extends IEntityPropsDto {
  name: string;
  email: string;
  password: string;
}

export interface IUserUpdateProps {
  name?: string;
  email?: string;
  password?: string;
}
