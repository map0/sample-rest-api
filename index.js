require('app-module-path').addPath(__dirname);

const log = require('lib/log')
const mongoose = require('lib/mongoose');
const validator = require('lib/validator')
const express = require('lib/express');
const loader = require('lib/loader');
const exceptions = require('exceptions');
const routes = require('routes');
const config = require('config/config');
const packageJson = require('package');

require('dotenv').config({ path: 'variables.env' });

const app = {
  name: packageJson.name,
  version: packageJson.version,
};

app.root = __dirname;

app.config = config

app.log = log(app);

app.mongoose = mongoose(app)

app.validator = validator(app)

app.models = loader(app, 'models');

app.express = express(app);

app.services = loader(app, 'services')

app.controllers = loader(app, 'controllers');

app.routes = routes(app);

app.exceptions = exceptions(app);
