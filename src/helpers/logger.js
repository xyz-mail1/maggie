const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      ignore: "pid,hostname",
      customColors: "info:blue,warn:yellow,error:red",
    },
  },
});

module.exports = class Logger {
  static log(content) {
    logger.info(content);
  }
  static warn(content) {
    logger.warn(content);
  }
  static error(content, ex) {
    logger.error(ex ? `${content}: ${ex?.message}` : `${content}`);
  }
  static debug(content) {
    logger.debug(content);
  }
}
