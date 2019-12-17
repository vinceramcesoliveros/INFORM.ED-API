import { Gender } from './enums';
import { Document } from 'mongoose';

export interface Account extends Document {
  readonly username?: string;
  readonly password?: string;
  readonly firstName?: string;
  readonly middleName?: string;
  readonly lastName?: string;
  readonly gender?: Gender;
  readonly role?: string;
  readonly email?: string;
}
