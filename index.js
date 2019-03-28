require('app-module-path').addPath(__dirname);

const express = require('express')();
const bodyParser = require('body-parser');
const log = require('lib/log')
const mongoose = require('lib/mongoose')
const config = require('config/config');
const UserModel = require('models/user');
const packageJson = require('package')

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

app.mongoose = mongoose(app)

app.models = {
  user: UserModel(app)
}

express.get('/', (req, res, next) => {
  res.send('hello world');
})

express.post('/', (req, res, next) => {
  const User = app.models.user
  const newUser = new User({ username: req.body.username });
  newUser.save();
  res.send('data created')
})

express.listen(app.config.port, () => {
  app.log.info(`Express is running. Please open http://localhost:${app.config.port}`)
})
