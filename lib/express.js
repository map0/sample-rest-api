const express = require('express')()
const bodyParser = require('body-parser');

module.exports = app => {
  express.use(bodyParser.json())
  express.use(bodyParser.urlencoded({ extended: true }))

  express.use((req, res, next) => {
    res.locals.req = req;
    next()
  })

  express.listen(process.env.PORT || app.config.port, () => {
    app.log.info(`Express is running. Please open http://localhost:${app.config.port}`)
  })

  return express
}
