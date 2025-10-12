import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swaggerConfig';
import routes from './src/routes/index.routes';
import errorHandler from './src/middleware/errorHandler';
import notFoundHandler from './src/middleware/notFoundHandler';
import { ApplicationResponse } from './src/types/types';

/**
 * Configure middleware for the Express application
 * @param app Express application instance
 */
const configureMiddleware = (app: Application): void => {
    // Security middleware
    app.use(cors());

    // Request logging
    app.use(morgan('dev'));

    // Request body parsers
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};

/**
 * Configure API documentation with Swagger
 * @param app Express application instance
 */
const configureSwagger = (app: Application): void => {
    app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

/**
 * Configure API routes and error handling
 * @param app Express application instance
 */
const configureRoutes = (app: Application): void => {
    // API routes
    app.use('/api', routes);
};

/**
 * Configure API error handling
 */
const configureErrorHandling = (app: Application): void => {
    // Error handling (order is important)
    app.use(notFoundHandler);  // Handle 404 errors
    app.use(errorHandler);     // Handle all other errors
};

/**
 * Initialize and configure the Express application
 * @returns Configured Express application
 */
const initializeApp = (): Application => {
    const app: Application = express();

    configureMiddleware(app);
    app.use('/', (req, res) => {
    var response: ApplicationResponse = {
        success: true,
        message: 'Welcome to the God of War Weapons API'
    };
    return res.status(200).json(response);
});
    configureSwagger(app);
    configureRoutes(app);
    configureErrorHandling(app);

    return app;
};

export default initializeApp();
