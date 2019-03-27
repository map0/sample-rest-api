const express = require('express');
const config = require('./config/config');

const app = express();

app.get('/', (req, res, next) => {
  res.send('hello world');
})

app.set('port', process.env.PORT || 7777)

app.listen(config.port, () => {
  console.log(`Express is running. Please open http://localhost:${config.port}`)
})
