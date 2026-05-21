import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import connectDB from './db/connection.js';
import app from './src/app.js';

// entry point for starting the back-end server

const PORT = process.env.PORT || 5050;

connectDB();

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});