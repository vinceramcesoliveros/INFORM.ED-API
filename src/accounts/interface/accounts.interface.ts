import { Gender } from './enums';
import { Document } from 'mongoose';
export interface Account extends Document {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: Gender;
  role?: string;
}
