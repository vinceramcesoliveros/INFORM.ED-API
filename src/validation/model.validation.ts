import { StudentDto } from '../student/dto/student.dto';
import { Service } from 'src/typings/service.implementation';
import { HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Student } from '../student/interface/student.interface';
import { DataTransferObject } from 'src/typings/dto.implementation';
import {
  ServiceValidation,
  ValidationQuery,
  ValidationColumn,
  ServiceValidator,
} from './model.interface';
/**
 * Add a scenario when a particular id is not a valid ID or it does not
 * exists from the database to ensure that there can be no errors.
 *
 */
export class ModelValidation {
  private readonly dataTransferObject?: DataTransferObject;
  private readonly serviceValidation?: ServiceValidation<any, any>[];
  constructor({
    dataTransferObject,
    serviceValidation,
  }: ServiceValidator = {}) {
    this.serviceValidation = serviceValidation;
    this.dataTransferObject = dataTransferObject;
  }

  serviceExists() {
    if (!this.serviceValidation.length) return;
    const error = [];
    for (const serviceSchema of this.serviceValidation) {
      if (
        !serviceSchema.service.findOne(
          this.dataTransferObject[serviceSchema.schema],
        )
      ) {
        error.push({
          name: serviceSchema.schema,
          message: `${serviceSchema.schema} not found!`,
        });
      }
    }
    if (error.length) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  /**
   * Query Type does the following for the chosen service,
   * - `FINDBYID(ID)`
   * - `UPDATE(ID,BODY)`
   * - `DELETE(ID)`
   *
   */
  public async validateId({
    id,
    service,
    type,
    body,
  }: ValidationQuery<any, any>) {
    try {
      if (!id) {
        throw `Id must be provided`;
      }
      if (body) {
        return await service[`${type}`](id, body);
      }

      return await service[`${type}`](id);
    } catch (error) {
      throw new BadRequestException(error, id);
    }
  }

  /**
   *
   * Validate only the type of a column you want to compare.
   */
  public validate({ value, column }: ValidationColumn) {
    if (!value) {
      throw new BadRequestException();
    }
    if (value !== column) {
      throw new BadRequestException(`The value must be a(n) "${column}"`);
    }
  }
}
