const express = require('express')()
const bodyParser = require('body-parser');

module.exports = app => {

  express.use(bodyParser.json())
  express.use(bodyParser.urlencoded({ extended: true }))

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

  return express
}