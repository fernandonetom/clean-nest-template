import { IEncryptAdapter } from '../../../application/interfaces/adapters/IEncryptAdapter';
import * as bcrypt from 'bcrypt';

export class BCryptAdapter extends IEncryptAdapter {
  private saltRounds = 10;

  getHash(data: string): Promise<string> {
    return bcrypt.hash(data, this.saltRounds);
  }
  compareHash(raw: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(raw, hashed);
  }
}
