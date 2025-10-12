"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const serverConfig_1 = __importDefault(require("./src/config/serverConfig"));
/**
 * Log server startup information
 * @param config Server configuration
 */
const logServerStartup = (config) => {
    console.log('\n=== God of War Weapons API ===');
    console.log(`🚀 Server Status: Running`);
    console.log(`🌐 Port: ${config.port}`);
    console.log(`🌍 Environment: ${config.nodeEnv}`);
    console.log(`📚 API Docs: http://localhost:${config.port}/swagger`);
    console.log('=============================\n');
};
/**
 * Start the server with the provided configuration
 * @param config Server configuration
 */
const startServer = async (config) => {
    try {
        const port = config.port || 3000;
        await new Promise((resolve) => {
            app_1.default.listen(port, () => {
                logServerStartup(config);
                resolve();
            });
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
// Initialize server
startServer(serverConfig_1.default);
