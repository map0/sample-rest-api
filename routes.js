const express = require('express');

// const catchErrors = fn => (...args) => fn(...args).catch(args[2]);
const catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

module.exports = (app) => {
  const router = express.Router();

  /**
   * User resources
   */
  const { users, auth } = app.controllers;

  router.get('/', auth.checkToken, catchErrors(users.index));

  router.post('/', auth.createToken, catchErrors(users.add));

  app.express.use(router);

  return router;
};
