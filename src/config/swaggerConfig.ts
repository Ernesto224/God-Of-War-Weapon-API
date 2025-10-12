import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

// Determinar la URL del servidor según el entorno
const getServerUrl = (): string => {
  // En Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // En producción (custom domain)
  if (process.env.NODE_ENV === 'production' && process.env.PRODUCTION_URL) {
    return process.env.PRODUCTION_URL;
  }
  
  // En desarrollo
  return `http://localhost:${process.env.PORT || 3001}`;
};

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.4',
    info: {
      title: 'God of War Weapons API',
      version: '1.0.0',
      description: 'API for managing God of War games and weapons information',
      contact: {
        name: 'API Support',
        url: 'https://github.com/Ernesto224/God-Of-War-Weapon-API'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: getServerUrl(),
        description: process.env.NODE_ENV === 'production'
          ? 'Production server'
          : 'Development server'
      }
    ],
    tags: [
      {
        name: 'Games',
        description: 'Operations related to God of War games'
      },
      {
        name: 'Weapons',
        description: 'Operations related to weapons in God of War'
      }
    ]
  },
  apis: [
    // Rutas absolutas que funcionan tanto en desarrollo como en producción
    path.join(__dirname, '../swagger.yaml'),
    path.join(__dirname, '../../swagger.yaml'),
    './swagger.yaml',
    './src/swagger.yaml'
  ]
};

let swaggerSpec: any;

try {
  swaggerSpec = swaggerJSDoc(swaggerOptions);
  
  // Validar que la especificación se generó correctamente
  if (!swaggerSpec || !swaggerSpec.openapi) {
    console.warn('⚠️  Swagger spec generated but missing openapi version');
  } else {
    console.log('✅ Swagger specification loaded successfully');
    console.log(`📚 API Version: ${swaggerSpec.info?.version}`);
  }
} catch (error) {
  console.error('❌ Error loading Swagger specification:', error);
  
  // Fallback: Crear especificación mínima si falla
  swaggerSpec = {
    openapi: '3.0.4',
    info: {
      title: 'God of War Weapons API',
      version: '1.0.0',
      description: 'API for managing God of War games and weapons information'
    },
    servers: [
      {
        url: getServerUrl()
      }
    ],
    paths: {},
    components: {}
  } as any;
}

export default swaggerSpec;