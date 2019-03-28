const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  /**
   * User resources
   */
  const { users } = app.controllers;

  router.get('/', users.index);

  router.post('/', users.add);

  app.express.use(router);

  return router;
};
