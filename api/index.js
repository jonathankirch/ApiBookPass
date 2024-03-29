const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));

app.use('/api', require('./route/search'));

app.use('/api', require('./route/populares'));

app.use('/api', require('./route/recomendados'))

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});

module.exports = app;