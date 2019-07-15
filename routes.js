// Our Express app module
const express = require('express');
const app = express();

// Importing the routes
const blogsRoutes = require('./routes/blogs.js');
const authorsRoutes = require('./routes/authors.js');
const sessionsRoutes = require('./routes/sessions.js');

// Registering our Routes
app.use('/blogs', blogsRoutes);
app.use('/authors', authorsRoutes);
app.use("/", sessionsRoutes);

// Exporting the changes
module.exports = app;