/**
 * Configuration module
 * Loads environment variables and exports application configuration
 */

require('dotenv').config()

// Server port configuration
const PORT = process.env.PORT

// Database URI - uses test database in test environment, otherwise production database
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = { PORT, MONGODB_URI}