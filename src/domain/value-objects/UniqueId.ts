import { UniqueIdException } from '../@shared/exceptions/UniqueIdException';
import { ValueObject } from '../@shared/value-objects/value-object';
import { v4 as uuidv4, validate } from 'uuid';

export class UniqueId extends ValueObject<string> {
  constructor(value?: string) {
    super(value ?? uuidv4());

    this.validate();
  }

  protected validate(): void {
    if (!validate(this._value))
      throw new UniqueIdException({
        id: ['The uuid is not valid'],
      });
  }
}
