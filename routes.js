// Our Express app module
const express = require('express');
const app = express();

// Importing the pageRoutes
const pageRoutes = require('./routes/pages');

// Registering our pageRoutes
app.use('/', pageRoutes);

// Exporting the changes
module.exports = app;