/**
 * Basic Functionality of CRUD in the data source.
 * must have these properties.
 *
 */
export interface QueryImplementation<T> {
  create(dataTransferObject: Object): Promise<T>;
  findAll(model?: T): Promise<T[]>;
  findOne(id: string): Promise<T>;
  update(id: string, dataTransferObject: Object): Promise<T>;
  delete(id: string): Promise<T>;
}
