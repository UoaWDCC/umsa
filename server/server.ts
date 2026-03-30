import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config({ path: './.env' });

import express from 'express';
import cors from 'cors';
import connectDB from './db/connection.js';
import developerRoutes from './src/routes/developers.js';

const app = express();
const PORT = Number(process.env.PORT) || 5050;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/developers', developerRoutes);

// Serve built React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));

// Catch-all: send index.html for any non-API route (SPA routing)
app.get('*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`server is runnninnnggg on port ${PORT}`);
});