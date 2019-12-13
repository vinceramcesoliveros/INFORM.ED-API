import { Document } from 'mongoose';
export interface Subject extends Document {
  name: string;
  description: string;
  units: number;
}
