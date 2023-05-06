import { UniqueId } from '../../../domain/value-objects/UniqueId';

export interface IUseCase<TEntity> {
  list(): Promise<TEntity[]>;

  create(entity: TEntity): Promise<void>;

  update(entity: TEntity): Promise<void>;

  findById(id: UniqueId): Promise<TEntity>;

  remove(entity: TEntity): Promise<void>;
}
