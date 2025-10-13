import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './src/config/serverConfig';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swaggerConfig';
import routes from './src/routes/index.routes';
import errorHandler from './src/middleware/errorHandler';
import notFoundHandler from './src/middleware/notFoundHandler';
import { ServerConfiguration } from './src/types/types';

/**
 * Configure middleware for the Express application
 * @param app Express application instance
 */
const configureMiddleware = (app: Application): void => {
    // Security middleware
    const corsOptions = {
        origin: config.allowOrigins,
        methods: config.allowMethods,
        optionsSuccessStatus: 200
    }
    app.use(cors(corsOptions));

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
    // Serve Swagger UI at /api-docs
    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(swaggerSpec(config)));
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

const app: Application = initializeApp();

/**
 * Log server startup information
 * @param config Server configuration
 */
const logServerStartup = (config: ServerConfiguration): void => {
    console.log('\n=== God of War Weapons API ===');
    console.log(`🚀 Server Status: Running`);
    console.log(`🌐 Port: ${config.port}`);
    console.log(`🌍 Environment: ${config.env}`);
    console.log(`📚 API Docs: ${config.hostUrl}/api-docs`);
    console.log('=============================\n');
};

/**
 * Start the server with the provided configuration
 * @param config Server configuration
 */
const startServer = async (config: ServerConfiguration): Promise<void> => {
    try {
        // CLAVE: Solo escuchar el puerto si NO es Vercel/Producción
        if (config.env === 'development') {
            const port = config.port || 3000;

            await new Promise<void>((resolve) => {
                app.listen(port, () => {
                    logServerStartup(config);
                    resolve();
                });
            });
        }
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Initialize server
startServer(config);

export default app;