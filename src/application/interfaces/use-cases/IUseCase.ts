import { Result } from '../../../domain/@shared/models/Result';
import { UniqueId } from '../../../domain/value-objects/UniqueId';

export interface IUseCase<TEntity> {
  findAll(): Promise<Result<TEntity[]>>;

  create(entity: TEntity): Promise<Result<void>>;

  update(entity: TEntity): Promise<Result<void>>;

  findById(id: UniqueId): Promise<Result<TEntity>>;

  remove(entity: TEntity): Promise<Result<void>>;
}
