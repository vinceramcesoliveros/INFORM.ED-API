import { Schema } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as mongooseHidden from 'mongoose-hidden';
export const AccountSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    role: {
      type: Schema.Types.ObjectId,
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
)
  .plugin(uniqueValidator)
  .plugin(mongooseHidden);
