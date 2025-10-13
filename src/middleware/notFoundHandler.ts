import { Request, Response } from "express";
import { ApplicationResponse } from "../types/types";
import { notFoundCode } from "../utils/codes";

const notFoundHandler = (req: Request, res: Response) => {

  const response: ApplicationResponse = {
    success: false,
    message: `Route ${req.originalUrl} not found`
  };

  return res.status(notFoundCode).json(response);

}

export default notFoundHandler;
