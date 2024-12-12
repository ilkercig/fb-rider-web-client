import log from "loglevel";

const logger = log;

if (import.meta.env.DEV) {
  logger.setLevel("debug");
} else if (import.meta.env.PROD) {
  logger.setLevel("warn");
}

export default logger;
