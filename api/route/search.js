const express = require('express');
const router = express.Router();

// Google Books API
const apiURL = `https://www.googleapis.com/books/v1/volumes`;

router.get('/search', async (req, res) => {
  try {
    const searchInput = req.query.q;

    if (!searchInput) {
      return res.status(400).send('Por favor, preencha o campo de pesquisa.');
    }

    const url = `${apiURL}?q=${encodeURIComponent(searchInput)}&maxResults=5&langRestrict=pt`;

    const response = await fetch(url);
    const data = await response.json();
    const livros = data.items.map((item) => ({
      titulo: item.volumeInfo.title,
      autor: item.volumeInfo.authors,
      imagem: item.volumeInfo.imageLinks.thumbnail,
      info: item.searchInfo.textSnippet,
    }));

    res.json({
      livros
    });
  } catch (err) {
    console.error(`Erro na API: ${err}`);
    res.status(500).send('Erro ao buscar livros');
  }
});

module.exports = router;
