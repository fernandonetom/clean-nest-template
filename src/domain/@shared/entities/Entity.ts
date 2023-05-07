import { UniqueId } from '../../value-objects/UniqueId';
import { IEntityPropsDto } from '../dtos/EntityDto';

export abstract class Entity {
  private _id: UniqueId;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: IEntityPropsDto) {
    this._id = props.id ?? new UniqueId();
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? null;
  }

  protected abstract validate(): void;
  protected abstract toJson(): Promise<string>;

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  protected set updatedAt(updateDate: Date) {
    this._updatedAt = updateDate;
  }
}
