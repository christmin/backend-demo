const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');

router.get('/', CategoryController.getAll);

router.post('/', CategoryController.create);

router.get('/:id', CategoryController.getSingle);

router.delete('/:id', CategoryController.deleteSingle);

module.exports = router;
