// app.js or server.js
const express = require('express');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const app = express();

// Import files
const db = require('./config/db');
const adminsSwaggerSpec = require('./config/adminSwaggerConfig');
const schoolSwaggerSpec = require('./config/schoolSwaggerConfig');

// Port Number
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors())

// DB Connection
db.once("open", () => console.log("Connected to Database Successfully"));
db.on("error", (error) => console.error('Database Connection error:', error));

// Swagger UI Setup
app.use('/api-docs/admin', swaggerUi.serveFiles(adminsSwaggerSpec), swaggerUi.setup(adminsSwaggerSpec));
app.use('/api-docs/school', swaggerUi.serveFiles(schoolSwaggerSpec), swaggerUi.setup(schoolSwaggerSpec));

// Router configuration
app.use('/api/v1', require('./routes/schoolRoutes'));
app.use('/api/v1', require('./routes/adminRoutes'));

// Start Server
app.listen(port, () => {
  console.log(`Server Started At ${port}`);
});
