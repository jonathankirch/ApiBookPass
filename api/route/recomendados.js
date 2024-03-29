const express = require('express');
const axios = require('axios');
const router = express.Router();

// Google Books API
const apiURL = `https://www.googleapis.com/books/v1/volumes`;

router.get('/recomendados/:userPreferences', async (req, res) => {
  try {
    const preferencesString = req.params.userPreferences;
    const userPreferences = JSON.parse(preferencesString);

    // Selecionando aleatoriamente um gênero de preferência
    const preferenceSorteado = userPreferences[Math.floor(Math.random() * userPreferences.length)];

    const url = `${apiURL}?q=subject:${preferenceSorteado}`;
    const response = await axios.get(url);

    const livros = response.data.items ? response.data.items.map((item) => ({
      titulo: item.volumeInfo.title,
			autor: item.volumeInfo.authors
				? item.volumeInfo.authors.join(', ')
				: 'Autor desconhecido',
			descricao: item.volumeInfo.description || 'Sem descrição',
			imagem:
				item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
					? item.volumeInfo.imageLinks.thumbnail ||
					  item.volumeInfo.imageLinks.smallThumbnail
					: 'https://placehold.co/500?text=Livro+sem+capa',
			numeroPaginas: item.volumeInfo.pageCount || 'Informação não disponível',
			dataPublicacao:
				item.volumeInfo.publishedDate || 'Data idisponível',
			editora: item.volumeInfo.publisher || 'Editora não disponível',
			valor:
				item.saleInfo &&
				item.saleInfo.listPrice &&
				item.saleInfo.listPrice.amount
					? item.saleInfo.listPrice.amount
					: 'Preço não disponível',
			linkCompra:
				item.saleInfo && item.saleInfo.buyLink
					? item.saleInfo.buyLink
					: '',
    })) : [];

    res.json({
      livros,
    });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).send(`Erro interno do servidor`);
  }
});

module.exports = router;
