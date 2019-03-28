const express = require('express');

module.exports = (app) => {

  const router = express.Router();

  router.get('/', (req, res, next) => {
    res.send('hello world');
  });

  router.post('/', (req, res, next) => {
    const User = app.models.user
    const newUser = new User({ username: req.body.username });
    newUser.save();
    res.send('data created')
  });

  app.express.use(router);

  return router;
};
