import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.join(__dirname, '../backend/.env') });

import User from '../backend/src/modules/auth/auth.model.js';
import Employee from '../backend/src/modules/employees/employee.model.js';
import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const runDiagnostics = async () => {
  try {
    console.log('Connecting to Atlas: ', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');

    // Test query
    const count = await User.countDocuments();
    console.log(`Current User count: ${count}`);

    // Fetch one
    const oneUser = await User.findOne({});
    console.log('Sample User: ', oneUser);

    if (oneUser) {
      const oneEmp = await Employee.findOne({ userId: oneUser._id });
      console.log('Sample Employee profile linked to user: ', oneEmp);
    }

    await mongoose.connection.close();
    console.log('Diagnostic completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Diagnostic failed: ', error);
    process.exit(1);
  }
};

runDiagnostics();
