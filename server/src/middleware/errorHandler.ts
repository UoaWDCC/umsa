import { ErrorRequestHandler } from 'express';
import { sendError } from '../utils/apiError.js';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }

  sendError(res, 500, 'INTERNAL_ERROR', 'Something went wrong');
};
