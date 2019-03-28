require('app-module-path').addPath(__dirname);

const express = require('express')();
const bodyParser = require('body-parser');
const log = require('lib/log')
const config = require('config/config');

const packageJson = require('./package')

const app = {
  name: packageJson.name,
  version: packageJson.version,
};

app.root = __dirname;

app.config = config

app.log = log(app);

require('dotenv').config({ path: 'variables.env' });

express.use(bodyParser.json())
express.use(bodyParser.urlencoded({ extended: true }))


/*
 * quickly setup db-connection
 */
const mongoose = require('mongoose');

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

express.get('/', (req, res, next) => {
  res.send('hello world');
})

express.post('/', (req, res, next) => {
  const newUser = new UserModel({ username: req.body.username });
  newUser.save();
  res.send('data created')
})

express.listen(app.config.port, () => {
  app.log.info(`Express is running. Please open http://localhost:${app.config.port}`)
})
