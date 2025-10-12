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
    
    // 1. Opciones personalizadas para forzar rutas absolutas
    // Esto asegura que el HTML generado por Swagger pida los archivos JS/CSS
    // con el prefijo /api/swagger/ que Vercel enruta a tu Express App.
    const swaggerCustomOptions = {
        customCssUrl: '/api/swagger/swagger-ui.css',
        customJs: [
            '/api/swagger/swagger-ui-bundle.js',
            '/api/swagger/swagger-ui-standalone-preset.js',
        ],
        swaggerOptions: {
            // Esto le dice a Swagger dónde buscar la especificación JSON/YAML
            url: '/api/swagger-json' 
        }
    };

    // 2. Endpoint para servir la especificación JSON (necesario)
    app.get('/api/swagger-json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec); // `swaggerSpec` se importa de './config/swaggerConfig'
    });

    // 3. Montar la documentación
    app.use(
        '/api/swagger',
        // **Clave**: swaggerUi.serveFiles se encarga de servir los activos estáticos 
        // (JS/CSS) desde node_modules bajo este path.
        swaggerUi.serveFiles(swaggerSpec, swaggerCustomOptions), 
        // swaggerUi.setup genera el HTML y usa las rutas absolutas forzadas arriba.
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

export default initializeApp();
