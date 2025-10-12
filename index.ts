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
    // Estas opciones FUERZAN al HTML a usar las rutas de assets que definimos
    // en los rewrites de vercel.json: /api/swagger/
    const swaggerCustomOptions = {
        customCssUrl: '/api/swagger/swagger-ui.css',
        customJs: [
            '/api/swagger/swagger-ui-bundle.js',
            '/api/swagger/swagger-ui-standalone-preset.js',
        ],
        swaggerOptions: {
            url: '/api/swagger-json',
            persistAuthorization: true
        }
    };

    // Endpoint para servir el JSON
    app.get('/api/swagger-json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    // La ruta UI DEBE ser '/api/swagger' para que los rewrites funcionen
    app.use(
        '/api/swagger',
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, swaggerCustomOptions)
    );
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
    console.log(`🌍 Environment: ${config.nodeEnv}`);
    console.log(`📚 API Docs: http://localhost:${config.port}/api-docs`);
    console.log('=============================\n');
};

/**
 * Start the server with the provided configuration
 * @param config Server configuration
 */
const startServer = async (config: ServerConfiguration): Promise<void> => {
    try {
        // CLAVE: Solo escuchar el puerto si NO es Vercel/Producción
        if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
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