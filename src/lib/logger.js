let winston = require("winston")
let debug = process.env.NODE_ENV !== 'production';

let logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
  ]
})

class MyLogger {
  constructor(logger) {
    this.logger = logger;
  }
  log(params) {
    if (!debug) return;
    this.logger.log(params)
  }
  info(params) {
    if (!debug) return;
    this.logger.info(params)
  }
  debug(params) {
    if (!debug) return;
    this.logger.debug(params)
  }
  error(params) {
    if (!debug) return;
    this.logger.debug(params)
  }
}

module.exports = {
  logger: new MyLogger(logger)
}