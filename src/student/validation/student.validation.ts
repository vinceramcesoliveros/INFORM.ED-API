import { StudentDto } from '../dto/student.dto';
import { Service } from 'src/typings/service.implementation';
import { HttpException, HttpStatus, BadRequestException } from '@nestjs/common';

export class StudentValidation {
  constructor(private readonly studentDto?: StudentDto) {}

  serviceExists(serviceValidation: Readonly<ServiceValidation<any>[]>) {
    const error = [];
    for (const serviceSchema of serviceValidation) {
      if (
        !serviceSchema.service.findOne(this.studentDto[serviceSchema.schema])
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
  public validateId(id: string) {
    if (!id) {
      throw new BadRequestException('Id must be provided', id);
    }
  }

  public validateStudentRole(role: string) {
    if (role !== 'student') {
      throw new BadRequestException('Role must be a student to be registered');
    }
  }
}

interface ServiceValidation<T> {
  schema: string;
  service: Service<T>;
}
