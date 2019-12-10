/**
 * Basic Functionality of CRUD in the data source.
 * must have these properties.
 *
 */
export abstract class QueryImplementation<T> {
  public abstract create(dataTransferObject: Object): Promise<T>;
  public abstract findAll(model?: T): Promise<T[]>;
  public abstract findOne(id: string): Promise<T>;
  public abstract update(id: string, dataTransferObject: Object): Promise<T>;
  public abstract delete(id: string): Promise<T>;
}
