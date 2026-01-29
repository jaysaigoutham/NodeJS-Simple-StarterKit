/**
 * Logger utility
 * Provides consistent logging functions with environment context
 */

/**
 * Log informational messages
 * @param {...any} params - Messages to log
 */
const info = (...params) => {
    //console.log(...params)
    console.log("ENV (", process.env.NODE_ENV, ") : ", ...params)
}

/**
 * Log error messages
 * @param {...any} params - Error messages to log
 */
const error = (...params) => {
    //console.log(...params)
    console.log("ENV (", process.env.NODE_ENV, ") : ", ...params)
}

module.exports = {info, error}