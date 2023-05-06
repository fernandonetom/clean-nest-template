import { User } from '../../../domain/entities/User';
import { IRepository } from './IRepository';

export interface IUsersRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
