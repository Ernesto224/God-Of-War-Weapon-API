import app from './app';
import config from './config/serverConfig';
import { ServerConfiguration } from './types/types';

/**
 * Log server startup information
 * @param config Server configuration
 */
const logServerStartup = (config: ServerConfiguration): void => {
    console.log('\n=== God of War Weapons API ===');
    console.log(`🚀 Server Status: Running`);
    console.log(`🌐 Port: ${config.port}`);
    console.log(`🌍 Environment: ${config.nodeEnv}`);
    console.log(`📚 API Docs: http://localhost:${config.port}/api/swagger`);
    console.log('=============================\n');
};

/**
 * Start the server with the provided configuration
 * @param config Server configuration
 */
const startServer = async (config: ServerConfiguration): Promise<void> => {
    try {
        const port = config.port || 3000;
        
        await new Promise<void>((resolve) => {
            app.listen(port, () => {
                logServerStartup(config);
                resolve();
            });
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Initialize server
startServer(config);