import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  gender: String,
  role: String,
});
