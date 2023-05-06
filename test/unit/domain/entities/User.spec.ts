import { EntityValidationException } from '../../../../src/domain/@shared/exceptions/EntityValidationException';
import { IUserPropsDto } from '../../../../src/domain/dtos/UserDto';
import { User } from '../../../../src/domain/entities/User';
import { UniqueId } from '../../../../src/domain/value-objects/UniqueId';
import { UserFixture } from '../fixtures/UserFixture';

describe('UserEntity', () => {
  it('should create an user', () => {
    const user = new User({
      name: 'Fake',
      email: 'fake@test.com',
      password: 'Any-password@',
    });

    expect(user.name).toBe('Fake');
    expect(user.email).toBe('fake@test.com');
  });

  it('should update an user', () => {
    const user = new User({
      name: 'Fake',
      email: 'fake@test.com',
      password: 'Any-password@',
    });

    user.update({
      name: 'new name',
      email: 'nem@email.com',
      password: 'new-strong-password',
    });

    expect(user.name).toBe('new name');
    expect(user.email).toBe('nem@email.com');
    expect(user.updatedAt).toBeTruthy();
  });

  it('should create an user instance with all props', () => {
    const now = new Date();
    const id = new UniqueId();
    const user = new User({
      id,
      name: 'Fake',
      email: 'fake@test.com',
      password: 'Any-password@',
      createdAt: now,
      updatedAt: now,
    });

    expect(user.id).toBe(id);
    expect(user.name).toBe('Fake');
    expect(user.email).toBe('fake@test.com');
    expect(user.createdAt).toBe(now);
    expect(user.updatedAt).toBe(now);
  });

  describe('should throw an error when creating an user passing invalid props', () => {
    const arrange: IUserPropsDto[] = [
      { name: undefined, email: 'fake@test.com', password: 'Any-password@' },
      { name: 'John Fake Name', email: undefined, password: 'Any-password@' },
      { name: 'John Fake Name', email: 'fake@test.com', password: undefined },
      { name: 'John Fake Name', email: 'fake@test.com', password: '123456' },
    ];

    test.each(arrange)('When props is %j', (prop) => {
      expect(() => {
        new User(prop);
      }).toThrow(EntityValidationException);
    });
  });

  describe('should throw an error when updating an user passing invalid props', () => {
    const arrange: IUserPropsDto[] = [
      { name: 'John Fake Name', email: 'a', password: 'Any-password@' },
      { name: 'John Fake Name', email: 'fake@test.com', password: '123456' },
    ];

    test.each(arrange)('When props is %j', (prop) => {
      expect(() => {
        const user = UserFixture.GenerateValidUser();
        user.update(prop);
      }).toThrow(EntityValidationException);
    });
  });
});
