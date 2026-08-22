import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { NODE_ENV } from './config/environment.js';
import router from './routes/index.js';
import errorHandler from './middleware/error.middleware.js';

const app = express();

// Standard Request Logger Middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Request Parsers & Security Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*', // Adjust to specific client URL in production (e.g. http://localhost:5173)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Health Check API
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Dayflow HRMS Backend is active.' });
});

// Mount Central Route Router
app.use('/api', router);

// Error Handling Middleware
app.use(errorHandler);

export default app;
