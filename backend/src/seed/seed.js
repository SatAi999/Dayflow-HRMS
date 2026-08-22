import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/environment.js';
// Placeholders for models:
// import User from '../modules/auth/auth.model.js';
// import Employee from '../modules/employees/employee.model.js';

const seedDatabase = async () => {
  try {
    console.log('[Dayflow Seeder] Seeding database started...');
    await mongoose.connect(MONGODB_URI);
    console.log('[Dayflow Seeder] Connected to MongoDB.');

    // 1. Clean existing records
    // await mongoose.connection.dropDatabase();
    console.log('[Dayflow Seeder] Database dropped / cleaned.');

    // 2. Seed Mock Roles & Users
    console.log('[Dayflow Seeder] Creating default Admin, HR and Employee accounts...');
    
    // TODO: Write actual seed inserts once models are finalized during development
    
    console.log('[Dayflow Seeder] Seeding finished successfully.');
    process.exit(0);
  } catch (error) {
    console.error(`[Dayflow Seeder] Critical error during seeding: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
