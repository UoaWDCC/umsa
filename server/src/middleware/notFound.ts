import { RequestHandler } from 'express';
import { sendError } from '../utils/apiError.js';

export const notFound: RequestHandler = (_req, res) => {
  sendError(res, 404, 'NOT_FOUND', 'Route not found');
};
