import {
  ITokenAdapter,
  ITokenInput,
  ITokenOutput,
} from '../../../application/interfaces/adapters/ITokenAdapter';
import * as jwt from 'jsonwebtoken';
import { Environment } from '../../environments';

export class JwtAdapter implements ITokenAdapter {
  async sing(input: ITokenInput): Promise<ITokenOutput> {
    const now = new Date();
    const expiration = Environment.jwt.expiration;

    const token = jwt.sign(input, Environment.jwt.secret, {
      expiresIn: expiration,
    });

    return {
      token,
      expiresAt: now.setSeconds(now.getSeconds() + expiration),
    };
  }

  async verify(token: string): Promise<ITokenInput> {
    const decoded = jwt.verify(token, Environment.jwt.secret) as ITokenInput;

    return {
      user: {
        id: decoded.user.id,
        email: decoded.user.email,
      },
    };
  }
}
