const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API',
    version: '1.0.0',
    description: 'A simple Express API',
  },
  servers: [
    {
      url: 'http://localhost:8088',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to your API route files
};

module.exports = swaggerJSDoc(options);
