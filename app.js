const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'API documentation for Todo application',
    },
  },
  apis: ['app.js', 'routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
