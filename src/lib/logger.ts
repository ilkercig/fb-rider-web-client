import log from 'loglevel'

const logger = log

if (process.env.NODE_ENV === 'development') {
  logger.setLevel('trace')
} else {
  logger.setLevel('warn')
}

export default logger
