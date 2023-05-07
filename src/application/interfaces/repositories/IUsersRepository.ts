import { User } from '../../../domain/entities/User';
import { IRepository } from './IRepository';

export abstract class IUsersRepository extends IRepository<User> {
  abstract findByEmail(email: string): Promise<User | null>;
}
