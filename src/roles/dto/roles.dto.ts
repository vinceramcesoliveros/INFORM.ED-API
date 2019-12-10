import { IsString, IsAlpha, IsDefined, IsMongoId } from 'class-validator';

export class RolesDto {
  @IsMongoId()
  readonly id?: string;
  @IsString()
  @IsAlpha()
  @IsDefined()
  readonly name: string;
}
