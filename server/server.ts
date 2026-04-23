import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import express from 'express';
import cors from 'cors';
import connectDB from './db/connection.js';
import developerRoutes from './src/routes/developers.js';

const app = express();
const PORT = process.env.PORT || 5050;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/developers', developerRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});