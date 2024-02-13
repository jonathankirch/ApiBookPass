const express = require('express');
const axios = require('axios')
const router = express.Router();

// Google Books API
const apiURL = `https://www.googleapis.com/books/v1/volumes`;

router.get('/search', async (req, res) => {
  try {
    const searchInput = req.query.q;

    if (!searchInput) {
      return res.status(400).send('Por favor, preencha o campo de pesquisa.');
    }

    const url = `${apiURL}?q=${encodeURIComponent(searchInput)}`;

    const response = await axios.get(url);
    const livros = response.data.items.map((item) => ({
      titulo: item.volumeInfo.title,
      autor: item.volumeInfo.authors
        ? item.volumeInfo.authors.join(', ')
        : 'Autor desconhecido',
      imagem: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
        ? item.volumeInfo.imageLinks.thumbnail
        : 'https://placehold.co/500?text=Livro+sem+capa',
      descricao: item.volumeInfo.description,
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
