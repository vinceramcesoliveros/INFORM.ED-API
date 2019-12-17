import { QueryImplementation } from './query.implementation';

export abstract class DataAccessImplementation<
  T,
  D
> extends QueryImplementation<T, D> {}
