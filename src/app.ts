import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig';
import routes from './routes/index.routes';
import errorHandler from './middleware/errorHandler';
import { ApplicationResponse } from './types/types';

const app: Application = express();

// Middlewares de seguridad
app.use(helmet());
app.use(cors());

// Logging
app.use(morgan('combined'));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api', routes);

// Manejo de rutas no encontradas
app.use((req: Request, res: Response, next) => {
  // Verificar si ninguna ruta anterior manejó la request
  const response: ApplicationResponse = {
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada`
  };
  
  res.status(404).json(response);
});

// Manejo de errores
app.use(errorHandler);

export default app;