const pino = require('pino');

module.exports = app => {
  const logger = pino({
    name: `${(app.name)} (${app.version})`,
    level: app.config.loglevel || 'debug',
    enabled: app.config.logEnabled,
  });

  return logger
}
