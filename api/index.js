const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send(`
  <h1>Hello Guys</h1>
  <br>
  <p>use "/api/*argument" to use API</p>
  <br>
  <p>Available Arguments</p>
  <ul>
    <li>search</li>
    <li>populares</li>
  </ul>
  `)
})

app.use('/api', require('./route/search'));

app.use('/api', require('./route/populares'));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});

module.exports = app;