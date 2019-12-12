import * as mongoose from 'mongoose';

import * as uniqueValidator from 'mongoose-unique-validator';
export const StudentSchema = new mongoose.Schema(
  {
    yearLevel: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      required: true,
      default: 'regular',
      enum: ['regular', 'irregular'],
    },
    units: { type: String, required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'course',
      required: true,
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account',
      required: true,
    },
  },
  { timestamps: true },
).plugin(uniqueValidator);
