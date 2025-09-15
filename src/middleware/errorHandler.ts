import { Request, Response, NextFunction } from 'express';
import { ApplicationResponse } from '../types/types';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error('Error:', err.stack);

  const response: ApplicationResponse = {
    success: false,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && {
      error: err.stack
    })
  };

  res.status(err.status || 500).json(response);
};

export default errorHandler;