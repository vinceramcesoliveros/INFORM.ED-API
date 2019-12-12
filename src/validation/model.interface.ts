import { Service } from 'src/typings/service.implementation';
import { DataTransferObject } from 'src/typings/dto.implementation';

export interface ServiceValidation<T> {
  schema: string;
  service: Service<T>;
}
export interface ServiceValidator {
  dataTransferObject?: DataTransferObject;
  serviceValidation?: ServiceValidation<any | null>[];
}
export interface ValidationColumn {
  value: string | number | boolean;
  column: string | number | boolean;
}
export interface ValidationQuery<T> {
  service: Service<T>;
  type: 'update' | 'delete' | 'findOne';
  id: string;
  body?: DataTransferObject;
}
