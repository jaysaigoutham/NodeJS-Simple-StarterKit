/**
 * Server entry point
 * Starts the Express server on configured port
 */

const app = require('./app') 
const config = require('./utils/config')
const logger = require('./utils/logger')

// Start the server
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})