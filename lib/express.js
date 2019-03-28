const express = require('express')()
const bodyParser = require('body-parser');

module.exports = app => {
  express.use(bodyParser.json())
  express.use(bodyParser.urlencoded({ extended: true }))

  express.listen(app.config.port, () => {
    app.log.info(`Express is running. Please open http://localhost:${app.config.port}`)
  })

  return express
}
