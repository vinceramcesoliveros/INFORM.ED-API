import { DataTransferObject } from 'src/typings/dto.implementation';
import { IsString, IsDefined, IsNumber, IsPositive } from 'class-validator';

export class SubjectDto extends DataTransferObject {
  @IsDefined()
  @IsString()
  readonly name: string;
  @IsDefined()
  @IsString()
  readonly description: string;
  @IsDefined()
  @IsNumber()
  @IsPositive()
  readonly units: number;
}
