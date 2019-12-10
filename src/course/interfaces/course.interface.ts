import { Document } from 'mongoose';

export interface Course extends Document {
  name: string;
  description: string;
  creditUnits: number;
}
