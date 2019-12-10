import * as mongoose from 'mongoose';

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
);
