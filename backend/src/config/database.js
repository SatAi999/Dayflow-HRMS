import mongoose from 'mongoose';
import dns from 'dns';
import { MONGODB_URI } from './environment.js';

// Force Node.js to use public DNS servers to resolve Atlas SRV records
dns.setServers(['8.8.8.8', '1.1.1.1']);

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
