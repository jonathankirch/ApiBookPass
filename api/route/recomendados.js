const express = require('express');
const axios = require('axios');
const router = express.Router();

// Google Books API
const apiURL = `https://www.googleapis.com/books/v1/volumes`;

router.post('/recomendados/:userPreferences', async (req, res) => {
  const preferences = req.params.userPreferences.join('|');
  const url = `${apiURL}?q=subject:${encodeURIComponent(preferences)}`;

  try {
    const response = await axios.get(url);
    const livros = response.data.items.map((item) => ({
      titulo: item.volumeInfo.title,
      autor: item.volumeInfo.authors
        ? item.volumeInfo.authors.join(', ')
        : 'Autor desconhecido',
      imagem:
        item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
          ? item.volumeInfo.imageLinks.thumbnail
          : 'https://placehold.co/500?text=Livro+sem+capa',
    }));

    res.json({
      livros,
    });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).send(`Erro interno do servidor`);
  }
});

module.exports = router;
