import * as dotenv from 'dotenv';
export default {
  mongoURI: process.env.MONGODB_URI || `mongodb://localhost:27017/db_informed`,
};
