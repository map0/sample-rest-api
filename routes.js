const express = require('express');

/* eslint arrow-body-style: 0 */
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
  const {
    users,
    auth,
    orders,
    products
  } = app.controllers;

  router.get('/', catchErrors(users.index));
  router.post('/register', auth.createToken, catchErrors(users.add));

  router.get('/products', catchErrors(products.list));
  router.post('/products', auth.checkToken, catchErrors(products.add));
  router.put('/products/:id', auth.checkToken, catchErrors(products.update));
  router.delete('/products/:id', auth.checkToken, catchErrors(products.delete));

  router.get('/orders', auth.checkToken, catchErrors(orders.list));
  router.post('/orders', auth.checkToken, catchErrors(orders.add));
  router.put('/orders/:id', auth.checkToken, catchErrors(orders.update));


  app.express.use(router);

  return router;
};
