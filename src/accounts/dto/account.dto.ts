import { Gender } from '../interface/enums';
import {
  IsString,
  IsAlpha,
  IsEnum,
  IsMongoId,
  IsDefined,
  IsOptional,
} from 'class-validator';
export class AccountsDto {
  @IsDefined()
  @IsAlpha()
  @IsString()
  readonly firstName: string;

  @IsDefined()
  @IsAlpha()
  @IsString()
  readonly middleName: string;

  @IsDefined()
  @IsAlpha()
  @IsString()
  readonly lastName: string;
  @IsDefined()
  @IsAlpha()
  @IsString()
  @IsEnum(Gender, {
    message: 'Gender must be male or female',
  })
  readonly gender: Gender;
  @IsDefined()
  @IsMongoId()
  readonly role: string;

  @IsOptional()
  @IsString()
  readonly image?: string;
}
