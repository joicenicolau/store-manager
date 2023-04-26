const express = require('express');
const productController = require('../controllers/productsControllers');

const route = express.Router(); 

route.get('/', productController.getAllProducts);
route.get('/:id', productController.getProductsById);

module.exports = route;