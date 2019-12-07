import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
@Injectable()
export class AccountsPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (value instanceof Object && this.isEmpty(value)) {
      throw new HttpException(
        'Validation Failed: No body submitted',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }
    const object = plainToClass(metadata.metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'ValidationError',
          error: this.formatErrors(errors),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private toValidate(metatype: Function): Boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
  private formatErrors(errors: ValidationError[]) {
    return errors.map(error => {
      for (const property in error.constraints) {
        if (error.constraints.hasOwnProperty(property)) {
          return {
            path: error.property,
            message: error.constraints[property],
          };
        }
      }
    });
  }
  private isEmpty(value: Object) {
    if (Object.keys(value).length > 0) {
      return false;
    }
    return true;
  }
}
