import { Service } from 'src/typings/service.implementation';
import { DataTransferObject } from 'src/typings/dto.implementation';

export interface ServiceValidation<T, D> {
  schema: string;
  service: Service<T, D>;
}
export interface ServiceValidator {
  dataTransferObject?: DataTransferObject;
  serviceValidation?: ServiceValidation<any | null, any>[];
}
export interface ValidationColumn {
  value: string | number | boolean;
  column: string | number | boolean;
}
export interface ValidationQuery<T, D> {
  service: Service<T, D>;
  type: 'update' | 'delete' | 'findOne';
  id: string;
  body?: DataTransferObject;
}
