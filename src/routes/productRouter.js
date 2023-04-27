const express = require('express');
const productController = require('../controllers/productsControllers');
const validateProduct = require('../middlewares/validateProductName');

const route = express.Router(); 

route.get('/', productController.getAllProducts);
route.get('/:id', productController.getProductsById);
route.post('/', validateProduct, productController.createProducts);

module.exports = route;