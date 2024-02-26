const express = require('express');
const axios = require('axios');
const router = express.Router();

// Google Books API
const apiURL = `https://www.googleapis.com/books/v1/volumes`;

router.get('/populares', async (req, res) => {
	try {
		const response = await axios.get(`${apiURL}?q=''&orderBy=relevance`);

		const livros = response.data.items.map((item) => ({
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
		}));

		res.json({
			livros,
		});
	} catch (err) {
		console.error(`Erro na API: ${err}`);
		res.status(500).send(`Erro ao buscar livros`);
	}
});

module.exports = router;
