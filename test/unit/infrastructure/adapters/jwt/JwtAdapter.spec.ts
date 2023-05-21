import { ITokenInput } from '../../../../../src/application/interfaces/adapters/ITokenAdapter';
import { JwtAdapter } from '../../../../../src/infrastructure/adapters/jwt/JwtAdapter';
import * as jwt from 'jsonwebtoken';
import { Environment } from '../../../../../src/infrastructure/environments';

describe('JwtAdapter', () => {
  let jwtAdapter: JwtAdapter;

  beforeEach(() => {
    jwtAdapter = new JwtAdapter();
  });

  it('should generate a token using input', async () => {
    const input: ITokenInput = {
      user: {
        email: 'any-email',
        id: 'any-id',
      },
    };
    jest.spyOn(Environment, 'getJwtConfig').mockReturnValueOnce({
      expiration: 60,
      secret: 'any-secret',
    });
    jest.spyOn(jwt, 'sign');

    const token = await jwtAdapter.sing(input);
    expect(token).toStrictEqual({
      token: expect.any(String),
      expiresAt: expect.any(Number),
    });
    expect(jwt.sign).toHaveBeenCalledWith(input, 'any-secret', {
      expiresIn: 60,
    });
  });

  it('should throw if jwt sign throws', async () => {
    const input: ITokenInput = {
      user: {
        email: 'any-email',
        id: 'any-id',
      },
    };
    const exception = new Error('any-error');
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw exception;
    });

    await expect(() => jwtAdapter.sing(input)).rejects.toThrowError();
  });

  it('should decode a token using valid token', async () => {
    const input: ITokenInput = {
      user: {
        email: 'any-email',
        id: 'any-id',
      },
    };
    jest.spyOn(Environment, 'getJwtConfig').mockReturnValue({
      expiration: 60,
      secret: 'any-secret',
    });
    const token = await jwtAdapter.sing(input);
    jest.spyOn(jwt, 'verify');

    const decoded = await jwtAdapter.verify(token.token);

    expect(decoded).toStrictEqual(input);
    expect(jwt.verify).toHaveBeenCalledWith(token.token, 'any-secret');
  });

  it('should throw if jwt verify throws', async () => {
    const exception = new Error('any-error');
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw exception;
    });

    await expect(() => jwtAdapter.verify('any-token')).rejects.toThrowError();
  });
});
