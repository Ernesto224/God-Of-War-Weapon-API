import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import { ServerConfiguration } from '../types/types';

const swaggerSpec = (config: ServerConfiguration) => {
  return swaggerJSDoc({
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
          url: config.hostUrl,
          description: `Server ${config.env} mode`
        }
      ],
    },
    apis: [
      path.join(__dirname, '../swagger.yaml'),
      path.join(__dirname, '../../swagger.yaml'),
      './swagger.yaml',
      './src/swagger.yaml'
    ],
  });
};

export default swaggerSpec;