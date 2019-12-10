import { Document } from 'mongoose';
import { Status } from '../enums/student.enums';
import { Account } from 'src/accounts/interface/accounts.interface';
import { Course } from 'src/course/interfaces/course.interface';
import { Role } from 'src/roles/interface/roles.interface';

export interface Student extends Document {
  readonly id?: number;
  readonly yearLevel?: number;
  readonly status: Status;
  readonly units: string;
  readonly account?: Account;
  readonly course?: Course;
  readonly role?: Role;
}
