import * as mongoose from 'mongoose';

import * as uniqueValidator from 'mongoose-unique-validator';
export const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    creditUnits: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
).plugin(uniqueValidator);
