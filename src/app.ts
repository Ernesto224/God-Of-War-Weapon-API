import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig';
import routes from './routes/index.routes';
import errorHandler from './middleware/errorHandler';
import notFoundHandler from './middleware/notFoundHandler';

const app: Application = express();

// Security Middlewares
app.use(cors());

// Logging
app.use(morgan('dev'));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', routes);

// Handle 404 errors (always after routes)
app.use(notFoundHandler);

// Error handling (always last)
app.use(errorHandler);

export default app;
