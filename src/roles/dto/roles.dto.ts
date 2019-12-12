import { IsString, IsAlpha, IsDefined } from 'class-validator';

export class RolesDto {
  @IsString()
  @IsAlpha()
  @IsDefined()
  readonly name: string;
}
