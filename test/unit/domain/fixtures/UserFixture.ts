import { User } from '../../../../src/domain/entities/User';

export class UserFixture {
  static GenerateValidUser(): User {
    return new User({
      name: 'Valid Name',
      password: 'Strong-Passw#rd',
      email: 'valid@email.com',
    });
  }
}
