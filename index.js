require('app-module-path').addPath(__dirname);

const log = require('lib/log')
const mongoose = require('lib/mongoose')
const express = require('lib/express');
const config = require('config/config');
const UserModel = require('models/user');
const packageJson = require('package')

require('dotenv').config({ path: 'variables.env' });

const app = {
  name: packageJson.name,
  version: packageJson.version,
};

app.root = __dirname;

app.config = config

app.log = log(app);

app.express = express(app);

app.mongoose = mongoose(app)

app.models = {
  user: UserModel(app)
}
