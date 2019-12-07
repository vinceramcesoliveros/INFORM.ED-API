import { Gender } from '../interface/enums';
import { IsString, IsAlpha, IsEnum } from 'class-validator';

export class AccountsDto {
  @IsAlpha()
  @IsString()
  readonly firstName: string;

  @IsAlpha()
  @IsString()
  readonly middleName: string;

  @IsAlpha()
  @IsString()
  readonly lastName: string;

  @IsAlpha()
  @IsString()
  @IsEnum(Gender, {
    message: 'Gender must be male or female',
  })
  readonly gender: Gender;

  @IsAlpha()
  @IsString()
  readonly role: string;
}
