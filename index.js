const express = require('express');
const app = express();
const cors = require('cors');

require('es6-promise').polyfill();
require('isomorphic-fetch');

app.use(cors());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/search', (req, res) => {
  const url = 'https://developer.mozilla.org/en-US/search.json?';
  const filters = '&topic=api&topic=css&topic=html&topic=js&topic=apps&topic=webdev';

  return fetch(`${url}q=${req.query.q}${filters}`, {
    mode: 'cors'
  })
    .then(data => data.json())
    .then(json => res.send(json.documents.slice(0, 3)));
});

app.listen(8080, '127.0.0.1');
