import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import express from 'express';
import cors from 'cors';
import connectDB from './db/connection.ts';
import developerRoutes from './src/routes/developers.ts';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/developers', developerRoutes);

app.listen(PORT, () => {
  console.log(`runnninnnggg on port ${PORT}`);
});