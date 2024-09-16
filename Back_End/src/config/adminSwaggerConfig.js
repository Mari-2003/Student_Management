const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Admin API',
      version: '1.0.0',
      description: 'API documentation for the Admin Management System',
    },
    servers: [
      {
        url: 'http://localhost:3002/api/v1', // Ensure this URL matches your server URL
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
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/adminRoutes.js'], // Path to the API files for the Admin API
};

const adminsSwaggerSpec = swaggerJSDoc(options);

module.exports = adminsSwaggerSpec;
