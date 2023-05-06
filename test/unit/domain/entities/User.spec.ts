import { User } from '../../../../src/domain/entities/User';

describe('UserEntity', () => {
  it('should create an user', () => {
    const user = new User({
      name: 'Fake',
      email: 'fake@test.com',
      password: 'Any-password@',
    });

    expect(user.getName).toBe('Fake');
    expect(user.getEmail).toBe('fake@test.com');
  });

  it('should throw an error when pass an invalid name', () => {
    expect(() => {
      new User({
        name: undefined,
        email: 'fake@test.com',
        password: 'Any-password@',
      });
    }).toThrow();
  });
});
