import { Status } from '../enums/student.enums';
import {
  IsNumber,
  IsDefined,
  IsEnum,
  IsDecimal,
  IsMongoId,
  IsOptional,
} from 'class-validator';
import { DataTransferObject } from 'src/typings/dto.implementation';

export class StudentDto extends DataTransferObject {
  @IsDefined()
  @IsEnum(Status, {
    message: 'Status must be regular or irregular',
  })
  readonly status: Status;

  @IsOptional()
  @IsNumber({})
  readonly yearLevel?: number = 1;
  @IsDefined()
  @IsDecimal()
  readonly units: string;

  @IsDefined()
  @IsMongoId()
  readonly course: string;
  @IsDefined()
  @IsMongoId()
  readonly account: string;
}
