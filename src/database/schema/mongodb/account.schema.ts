import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'role',
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);
