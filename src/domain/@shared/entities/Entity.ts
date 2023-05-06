export abstract class Entity {
  private id: string;
  private createdAt: Date;

  constructor() {
    this.id = 'gerar-id';
    this.createdAt = new Date();
  }

  protected abstract validate(): void;
}
