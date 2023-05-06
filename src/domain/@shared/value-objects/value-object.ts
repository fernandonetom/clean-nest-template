export abstract class ValueObject<TValue> {
  protected readonly _value: TValue;

  constructor(value: TValue) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  protected abstract validate(): void;
}
