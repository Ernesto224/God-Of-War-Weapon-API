import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.1.1',
    info: {
      title: 'God-Of-War-Weapon-API',
      version: '1.0.0',
      description: 'API for managing God of War games and weapons information',
    },
    servers: [
      {
        url: process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}/api`
          : 'http://localhost:3001/api',
        description: process.env.NODE_ENV === 'production' 
          ? 'Production server' 
          : 'Development server',
      }
    ],
  },
  apis: ['src/types/swaggerSchemas.ts','src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;