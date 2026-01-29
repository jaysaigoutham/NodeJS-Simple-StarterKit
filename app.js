/**
 * Main application configuration file
 * Sets up Express app with middleware, routes, and database connection
 */

const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

// Establish MongoDB connection
logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

// Middleware setup
app.use(express.static('dist')) // Serve static files from dist directory
app.use(express.json()) // Parse JSON request bodies
app.use(middleware.requestLogger) // Log all incoming requests

// API routes
app.use('/api/notes', notesRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

// Error handling middleware (must be last)
app.use(middleware.unknownEndpoint) // Handle 404 errors
app.use(middleware.errorHandler) // Handle all other errors

module.exports = app