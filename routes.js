// Our Express app module
const express = require('express');
const app = express();

// Importing the pageRoutes
const pageRoutes = require('./routes/pages');
const blogRoutes = require('./routes/blogs');

// Registering our pageRoutes
app.use('/', pageRoutes);
app.use('/blogs', blogRoutes);

// Exporting the changes
module.exports = app;