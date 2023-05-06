import { UniqueId } from '../../../domain/value-objects/UniqueId';

export interface IRepository<TEntity> {
  findAll(): Promise<TEntity[]>;

  create(entity: TEntity): Promise<void>;

  update(entity: TEntity): Promise<void>;

  findById(id: UniqueId): Promise<TEntity | null>;

  remove(entity: TEntity): Promise<void>;
}
