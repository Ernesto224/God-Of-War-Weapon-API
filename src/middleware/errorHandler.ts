import { Request, Response, NextFunction } from 'express';
import { ApplicationResponse } from '../types/types';
import { serverErrorCode } from '../utils/codes';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {

  const response: ApplicationResponse = {
    success: false,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && {
      error: err.stack
    })
  };

  res.status(err.status || serverErrorCode).json(response);
  
};

export default errorHandler;