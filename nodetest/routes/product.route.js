const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products.controller');

router.get('/', ProductController.getAll);

router.post('/', ProductController.create);

router.get('/name', ProductController.getByTitle)

router.get('/:category_id', ProductController.getOneByCategoryId)

router.put('/:id', ProductController.updateSingle);

router.delete('/:id', ProductController.deleteSingle);

module.exports = router;
