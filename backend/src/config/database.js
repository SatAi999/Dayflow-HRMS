import mongoose from 'mongoose';
import { MONGODB_URI } from './environment.js';

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`[Dayflow Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Dayflow Database] Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
