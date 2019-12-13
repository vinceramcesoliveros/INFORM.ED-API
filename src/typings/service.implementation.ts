import { QueryImplementation } from './query.implementation';

export abstract class Service<T, D> extends QueryImplementation<T, D> {}
