import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.1.1',
    info: {
      title: 'God-Of-War-Weapon-API',
      version: '1.0.0',
      description: 'A sample API for demonstration purposes',
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to your API route files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;