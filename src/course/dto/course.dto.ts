import { IsString, IsDefined, IsDecimal } from 'class-validator';

export class CourseDto {
  @IsString()
  @IsDefined()
  readonly name: string;
  @IsString()
  @IsDefined()
  readonly description: string;

  @IsDecimal()
  @IsDefined()
  readonly creditUnits: number;
}
