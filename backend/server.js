import app from './src/app.js';
import { PORT } from './src/config/environment.js';
import connectDatabase from './src/config/database.js';

// Connect to MongoDB Database
connectDatabase();

// Start Server
app.listen(PORT, () => {
  console.log(`[Dayflow Backend] Server is running in active state on http://localhost:${PORT}`);
});
