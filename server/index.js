const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/api/', (req, res) => {
  let results = [];

  res.setHeader('Content-Type', 'application/json');

  fetch('http://www.recipepuppy.com/api/')
	  .then(response => response.json())
	  .then((data) => {
		  res.send(JSON.stringify(data));
	  })
	  .catch(error => console.log(error));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
