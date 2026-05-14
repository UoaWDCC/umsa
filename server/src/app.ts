import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import developerRoutes from './routes/developers.js';
import healthRoutes from './routes/health.js';
import { apiRateLimit } from './middleware/rateLimit.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

// splitting 

const app = express();

// security:
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: process.env.JSON_BODY_LIMIT || '1mb' }));
app.use('/api', apiRateLimit);
app.use('/api/health', healthRoutes);

// endpoints -- add new endpoints below
app.use('/api/developers', developerRoutes);

// fallbacks
app.use(notFound);
app.use(errorHandler);

export default app;
