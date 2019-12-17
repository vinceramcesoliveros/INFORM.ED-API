/**
 * Basic Functionality of CRUD in the data source.
 * must have these properties.
 *
 * Useful to both Controllers and Service to have the same implementation.
 * other classes are free to inherit it.
 */
export abstract class QueryImplementation<T, D> {
  public abstract async create(dataTransferObject: D): Promise<T>;
  public abstract async findAll(model?: T): Promise<T[]>;
  public abstract async findOne(id: string): Promise<T | null>;
  public abstract async update(
    id: string,
    dataTransferObject: D,
  ): Promise<T | null>;
  public abstract async delete(id: string): Promise<T | null>;
}
