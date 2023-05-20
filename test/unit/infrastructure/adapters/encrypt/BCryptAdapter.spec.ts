import { BCryptAdapter } from '../../../../../src/infrastructure/adapters/encrypt/BCryptAdapter';
import * as bcrypt from 'bcrypt';
jest.mock('bcrypt');

describe('BCryptAdapter', () => {
  let bcryptAdapter: BCryptAdapter;

  beforeEach(() => {
    bcryptAdapter = new BCryptAdapter();
  });
  it('should call hash with correct values', async () => {
    const expectedReturn = 'fake-strong-hash';
    const plainText = 'any-text-to-hash';
    const saltRounds = 10;
    jest.spyOn(bcrypt, 'hash').mockResolvedValue(expectedReturn as never);

    const act = await bcryptAdapter.getHash(plainText);

    expect(act).toBe(expectedReturn);
    expect(bcrypt.hash).toHaveBeenCalledWith(plainText, saltRounds);
  });

  it('should throw if hash throws', async () => {
    const plainText = 'any-text-to-hash';
    const exception = new Error('any-error');
    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(exception as never);

    const act = bcryptAdapter.getHash(plainText);

    await expect(act).rejects.toThrowError(exception);
  });

  it('should call compare with correct values', async () => {
    const hash = 'fake-strong-hash';
    const raw = 'any-text-to-hash';
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

    const act = await bcryptAdapter.compareHash(raw, hash);

    expect(act).toBe(true);
    expect(bcrypt.compare).toHaveBeenCalledWith(raw, hash);
  });

  it('should throw if hash throws', async () => {
    const hash = 'fake-strong-hash';
    const raw = 'any-text-to-hash';
    const exception = new Error('any-error');
    jest.spyOn(bcrypt, 'compare').mockRejectedValueOnce(exception as never);

    const act = bcryptAdapter.compareHash(raw, hash);

    await expect(act).rejects.toThrowError(exception);
  });
});
