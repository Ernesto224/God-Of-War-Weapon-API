import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'God of War Weapons API',
      version: '1.0.0',
      description: 'API for managing God of War games and weapons information',
      contact: {
        name: 'API Support',
        url: 'https://github.com/Ernesto224/God-Of-War-Weapon-API'
      },
    },
    servers: [
      {
        url: process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : 'http://localhost:3001',
        description: process.env.NODE_ENV === 'production'
          ? 'Production server'
          : 'Development server'
      }
    ],
  },
  apis: [
    path.join(__dirname, '../swagger.yaml'),
    path.join(__dirname, '../../swagger.yaml'),
    './swagger.yaml',
    './src/swagger.yaml'
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;