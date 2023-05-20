export abstract class IEncryptAdapter {
  abstract getHash(data: string): Promise<string>;
  abstract compareHash(raw: string, hashed: string): Promise<boolean>;
}
