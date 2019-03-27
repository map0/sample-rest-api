const express = require('express');
const bodyParser = require('body-parser');
const logger = require('pino')();
const config = require('./config/config');

const app = express();

require('dotenv').config({ path: 'variables.env' });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


/*
 * quickly setup db-connection
 */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })

mongoose.connection.on('error', (err) => {
  logger.error(`ouch -> ${err.message}`)
})

mongoose.connection.on('error', () => {
  logger.error('connection error with mongodb');
});

mongoose.connection.on('open', () => {
  logger.info('connected to mongodb on');
});

mongoose.connection.on('disconnected', () => {
  logger.error('Mongoose default connection disconnected');
});

/**
 * define a basic mongoDB Model for user
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

const UserModel = mongoose.model('User', userSchema);

app.get('/', (req, res, next) => {
  res.send('hello world');
})

app.post('/', (req, res, next) => {
  const newUser = new UserModel({ username: req.body.username });
  newUser.save();
})

app.listen(config.port, () => {
  logger.info(`Express is running. Please open http://localhost:${config.port}`)
})
