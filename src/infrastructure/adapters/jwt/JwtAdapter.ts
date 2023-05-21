import {
  ITokenAdapter,
  ITokenInput,
  ITokenOutput,
} from '../../../application/interfaces/adapters/ITokenAdapter';
import * as jwt from 'jsonwebtoken';
import { Environment } from '../../environments';

export class JwtAdapter extends ITokenAdapter {
  async sing(input: ITokenInput): Promise<ITokenOutput> {
    const now = new Date();
    const { expiration, secret } = Environment.getJwtConfig();

    const token = jwt.sign(input, secret, {
      expiresIn: expiration,
    });

    return {
      token,
      expiresAt: now.setSeconds(now.getSeconds() + expiration),
    };
  }

  async verify(token: string): Promise<ITokenInput> {
    const decoded = jwt.verify(
      token,
      Environment.getJwtConfig().secret,
    ) as ITokenInput;

    return {
      user: {
        id: decoded.user.id,
        email: decoded.user.email,
      },
    };
  }
}
