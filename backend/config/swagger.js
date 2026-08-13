const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TutionMaster API',
      version: '1.0.0',
      description: 'Public API for the TutionMaster tutoring marketplace (Nepal).',
    },
    servers: [{ url: '/api/v1' }, { url: '/api' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // JSDoc `@openapi` blocks are read from route files.
  apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);
