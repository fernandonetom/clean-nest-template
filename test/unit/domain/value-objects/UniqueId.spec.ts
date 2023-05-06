import { UniqueIdException } from '../../../../src/domain/@shared/exceptions/UniqueIdException';
import { UniqueId } from '../../../../src/domain/value-objects/UniqueId';
import * as uuid from 'uuid';

jest.mock('uuid');
describe('UniqueId', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('Should create a new value unique ID', () => {
    jest.spyOn(uuid, 'v4').mockReturnValue('any-uuid-valid');
    jest.spyOn(uuid, 'validate').mockReturnValue(true);

    const uniqueId = new UniqueId();

    expect(uniqueId.value).toBe('any-uuid-valid');
    expect(uuid.v4).toHaveBeenCalledTimes(1);
  });

  it('Should use and validate an invalid unique ID', () => {
    expect(() => new UniqueId('any-uuid-invalid')).toThrowError(
      new UniqueIdException({
        id: ['The uuid is not valid'],
      }),
    );
  });

  it('Should use and validate a valid unique ID', () => {
    const anyId = '034be283-717c-4642-b5f0-36774a58cbf0';
    jest.spyOn(uuid, 'validate').mockReturnValue(true);

    const uniqueId = new UniqueId(anyId);

    expect(uniqueId.value).toBe(anyId);
    expect(uuid.v4).not.toHaveBeenCalled();
  });
});
