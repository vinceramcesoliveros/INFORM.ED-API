import * as mongoose from 'mongoose';
import * as mongooseHidden from 'mongoose-hidden';
import * as uniqueValidator from 'mongoose-unique-validator';
export const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
)
  .plugin(uniqueValidator)
  .plugin(mongooseHidden);
