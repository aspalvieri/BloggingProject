// Our Express app module
const express = require('express');
const app = express();

// Importing the routes
const pageRoutes = require('./routes/pages.js');
const blogRoutes = require('./routes/blogs.js');

// Registering our pageRoutes
app.use('/', pageRoutes);
app.use('/blogs', blogRoutes);

// Exporting the changes
module.exports = app;