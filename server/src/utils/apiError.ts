import { Response } from 'express';

export type ApiErrorCode =
  | 'BAD_REQUEST'
  | 'INTERNAL_ERROR'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR';

export type ApiErrorResponse = {
  error: {
    code: ApiErrorCode;
    message: string;
  };
};

export const sendError = (
  res: Response,
  status: number,
  code: ApiErrorCode,
  message: string
): Response<ApiErrorResponse> => {
  return res.status(status).json({
    error: {
      code,
      message,
    },
  });
};
