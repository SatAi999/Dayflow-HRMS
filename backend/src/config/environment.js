import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root of backend
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dayflow';
export const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_temporary_key_change_in_production';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
