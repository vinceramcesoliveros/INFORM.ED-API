import { Schema } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as mongooseHidden from 'mongoose-hidden';

export const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    units: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
)
  .plugin(uniqueValidator)
  .plugin(mongooseHidden);
