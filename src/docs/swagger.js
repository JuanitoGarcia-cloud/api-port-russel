const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Port de plaisance Russel API',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes/*.js', './src/models/*.js']
};

module.exports = swaggerJSDoc(options);
