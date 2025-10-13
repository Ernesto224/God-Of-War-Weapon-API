import { Request, Response, NextFunction } from 'express';
import { ApplicationResponse } from '../types/types';
import { serverErrorCode } from '../utils/codes';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

  const response: ApplicationResponse = {
    success: false,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && {
      error: err.stack
    })
  };

  return res.status(err.status || serverErrorCode).json(response);
  
};

export default errorHandler;