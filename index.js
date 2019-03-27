const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.send('hello world');
})

app.set('port', process.env.PORT || 7777)

app.listen(app.get('port'), () => {
  console.log(`Express is running. Please open http://localhost:${app.get('port')}`)
})
