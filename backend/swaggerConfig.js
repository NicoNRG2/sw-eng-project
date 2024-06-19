const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bakery4You API',
      version: '1.0.0',
      description: 'A simple API for a bakery website',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
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
  apis: ['./routes/*.js'], // Percorso ai tuoi file di route
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
