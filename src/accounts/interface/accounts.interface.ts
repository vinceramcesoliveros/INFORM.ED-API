import { Gender } from './enums';
import { Document } from 'mongoose';
import { Role } from 'src/roles/interface/roles.interface';
export interface Account extends Document {
  readonly firstName?: string;
  readonly middleName?: string;
  readonly lastName?: string;
  readonly gender?: Gender;
  readonly role?: Role;
}
