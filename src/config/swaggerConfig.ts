import swaggerJSDoc from 'swagger-jsdoc';

// Determinar la URL del servidor según el entorno
const getServerUrl = (): string => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  if (process.env.NODE_ENV === 'production' && process.env.PRODUCTION_URL) {
    return process.env.PRODUCTION_URL;
  }
  
  return `http://localhost:${process.env.PORT || 3001}`;
};

// Definición completa de Swagger embebida en el código
const swaggerDefinition = {
  openapi: '3.0.4',
  info: {
    title: 'God of War Weapons API',
    version: '1.0.0',
    description: 'API for managing God of War games and weapons information',
    contact: {
      name: 'API Support',
      url: 'https://github.com/Ernesto224/God-Of-War-Weapon-API'
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
  ],
  paths: {
    '/api/games/all': {
      get: {
        summary: 'Retrieve all games',
        description: 'Fetches a paginated list of all God of War games',
        tags: ['Games'],
        parameters: [
          {
            in: 'query',
            name: 'page',
            schema: {
              type: 'integer',
              minimum: 1,
              default: 1
            },
            description: 'The page of results to retrieve'
          },
          {
            in: 'query',
            name: 'limit',
            schema: {
              type: 'integer',
              minimum: 1,
              maximum: 50,
              default: 10
            },
            description: 'The number of games to retrieve per page'
          }
        ],
        responses: {
          '200': {
            description: 'Successfully retrieved list of games',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Games fetched successfully' },
                    data: {
                      type: 'object',
                      properties: {
                        count: { type: 'integer' },
                        pages: { type: 'integer' },
                        page: { type: 'integer' },
                        items: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/Game' }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/games/{id}': {
      get: {
        summary: 'Get a game by ID',
        tags: ['Games'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: 'Game ID'
          }
        ],
        responses: {
          '200': {
            description: 'Game found successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Game fetched successfully' },
                    data: { $ref: '#/components/schemas/Game' }
                  }
                }
              }
            }
          },
          '204': {
            description: 'Game not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/weapons/all': {
      get: {
        summary: 'Retrieve all weapons',
        description: 'Fetches a paginated list of all weapons with their movements',
        tags: ['Weapons'],
        parameters: [
          {
            in: 'query',
            name: 'page',
            schema: {
              type: 'integer',
              minimum: 1,
              default: 1
            },
            description: 'The page of results to retrieve'
          },
          {
            in: 'query',
            name: 'limit',
            schema: {
              type: 'integer',
              minimum: 1,
              maximum: 50,
              default: 10
            },
            description: 'The number of weapons to retrieve per page'
          }
        ],
        responses: {
          '200': {
            description: 'Successfully retrieved list of weapons',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Weapons fetched successfully' },
                    data: {
                      type: 'object',
                      properties: {
                        count: { type: 'integer' },
                        pages: { type: 'integer' },
                        page: { type: 'integer' },
                        items: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/Weapon' }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/weapons/{id}': {
      get: {
        summary: 'Get a weapon by ID',
        tags: ['Weapons'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: 'Weapon ID'
          }
        ],
        responses: {
          '200': {
            description: 'Weapon found successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Weapon fetched successfully' },
                    data: { $ref: '#/components/schemas/Weapon' }
                  }
                }
              }
            }
          },
          '204': {
            description: 'Weapon not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Game: {
        description: 'Represents a God of War game in the series',
        type: 'object',
        required: ['id', 'name', 'releaseYear', 'summary'],
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier for the game'
          },
          name: {
            type: 'string',
            description: 'Title of the game'
          },
          releaseYear: {
            type: 'string',
            description: 'Release date of the game'
          },
          summary: {
            type: 'string',
            description: "Brief overview of the game's story"
          }
        }
      },
      Movement: {
        description: 'Represents a special combat move for a weapon',
        type: 'object',
        required: ['unlockLevel', 'combination'],
        properties: {
          unlockLevel: {
            type: 'integer',
            description: 'Character level required to unlock this move'
          },
          combination: {
            type: 'string',
            description: 'Controller input combination to perform the move'
          }
        }
      },
      Weapon: {
        description: 'Represents a weapon that can be used in combat',
        type: 'object',
        required: ['id', 'name', 'description', 'archives', 'maxLevel', 'movements'],
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier for the weapon'
          },
          name: {
            type: 'string',
            description: 'Name of the weapon'
          },
          description: {
            type: 'string',
            description: "Detailed description of the weapon's background and capabilities"
          },
          archives: {
            type: 'array',
            items: { type: 'string' },
            description: 'Collection of media resources related to the weapon'
          },
          maxLevel: {
            type: 'integer',
            description: 'Maximum upgrade level achievable for this weapon'
          },
          movements: {
            type: 'array',
            items: { $ref: '#/components/schemas/Movement' },
            description: 'Collection of special moves available for this weapon'
          }
        }
      },
      Error: {
        description: 'Error response structure',
        type: 'object',
        required: ['success', 'message'],
        properties: {
          success: {
            type: 'boolean',
            description: 'Always false for error responses',
            example: false
          },
          message: {
            type: 'string',
            description: 'Description of what went wrong'
          }
        }
      }
    }
  }
};

// Exportar la definición directamente (sin usar swagger-jsdoc)
const swaggerSpec = swaggerDefinition;

export default swaggerSpec;