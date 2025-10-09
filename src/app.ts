import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig';
import routes from './routes/index.routes';
import errorHandler from './middleware/errorHandler';
import notFoundHandler from './middleware/notFoundHandler';

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
    const swaggerUiOptions = {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'God of War Weapons API Documentation',
        customfavIcon: '/favicon.ico'
    };
    
    // Serve Swagger UI
    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(swaggerSpec, swaggerUiOptions));
    
    // Expose OpenAPI spec as JSON
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
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
    configureSwagger(app);
    configureRoutes(app);
    configureErrorHandling(app);

    return app;
};

export default initializeApp();
