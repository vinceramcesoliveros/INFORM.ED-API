import { Status } from '../enums/student.enums';
import {
  IsNumber,
  IsDefined,
  IsEnum,
  IsDecimal,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class StudentDto {
  @IsDefined()
  @IsEnum(Status, {
    message: 'Status must be regular or irregular',
  })
  readonly status: Status;

  @IsOptional()
  @IsNumber()
  readonly yearLevel?: number;
  @IsDefined()
  @IsDecimal()
  readonly units: string;

  @IsDefined()
  @IsMongoId()
  readonly course: string;

  @IsDefined()
  @IsMongoId()
  readonly role: string;
  @IsDefined()
  @IsMongoId()
  readonly account: string;
}
