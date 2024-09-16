const swaggerJSDoc = require('swagger-jsdoc');


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'School Management API',
      version: '1.0.0',
      description: 'API documentation for the School Management System',
    },
    servers: [
      {
        url: 'http://localhost:3002/api/v1', // Ensure this URL matches your server URL
      },
    ],
  },
  apis: ['./routes/schoolRoutes.js'], // Path to the API files for the School API
};

const schoolSwaggerSpec = swaggerJSDoc(options);

module.exports = schoolSwaggerSpec;
