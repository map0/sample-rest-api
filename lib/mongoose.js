const mongoose = require('mongoose');

module.exports = app => {
  mongoose.Promise = global.Promise

  mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })

  mongoose.connection.on('error', (err) => {
    app.log.error(`ouch -> ${err.message}`)
  })

  mongoose.connection.on('error', () => {
    app.log.error('connection error with mongodb');
  });

  mongoose.connection.on('open', () => {
    app.log.info('connected to mongodb on');
  });

  mongoose.connection.on('disconnected', () => {
    app.log.error('Mongoose default connection disconnected');
  });
  return mongoose
};
