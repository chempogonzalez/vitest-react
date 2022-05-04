const ERROR_CODE = 1

/* eslint-disable no-console */
/**
 * Logs a message in the command line
 *
 * @param args all passed arguments
 */
function log (...args) {
  console.log('[vitest-react] ', ...args)
}


/**
 * Shows an error in the command line and exits process
 *
 * @param {String} msg message to be displayed
 */
const displayError = msg => {
  console.error(`✖ Error: ${msg}\n`)
  process.exit(ERROR_CODE)
}

module.exports = { log, displayError }
