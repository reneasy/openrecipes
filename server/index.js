const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/api/', (req, res) => {
  const data = [];

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
