const express = require('express');
const router = express.Router();

// Google Books API
const apiURL = `https://www.googleapis.com/books/v1/volumes`;

router.get('/populares', async (req, res) => {
  try {
    const response = await fetch(`${apiURL}?q=''&orderBy=relevance&maxResults=13`);
    const data = await response.json();
    const total = data.totalItems;
    const livros = data.items.map((item) => ({
      titulo: item.volumeInfo.title,
      autor: item.volumeInfo.authors,
      imagem: item.volumeInfo.imageLinks.thumbnail,
    }));

    res.json({
      total, livros,
    });
  } catch (err) {
    console.error(`Erro na API: ${err}`);
    res.status(500).send(`Erro ao buscar livros`);
  }
});

module.exports = router;
