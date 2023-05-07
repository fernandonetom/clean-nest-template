import { UniqueId } from '../../../domain/value-objects/UniqueId';

export abstract class IRepository<TEntity> {
  abstract findAll(): Promise<TEntity[]>;

  abstract create(entity: TEntity): Promise<void>;

  abstract update(entity: TEntity): Promise<void>;

  abstract findById(id: UniqueId): Promise<TEntity | null>;

  abstract remove(entity: TEntity): Promise<void>;
}
