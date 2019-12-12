import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
export const AccountSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
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
).plugin(uniqueValidator);
