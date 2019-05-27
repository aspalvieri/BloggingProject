const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`Hey 'dere world!`);
});

app.get('/about', (req, res) => {
  res.send(`I like long walks on the beach.`);
});

const port = (process.env.PORT || 4000);
app.listen(port, () => console.log(`Listening on ${port}`));