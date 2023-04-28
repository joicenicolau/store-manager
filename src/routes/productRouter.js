const express = require('express');
const productController = require('../controllers/productsControllers');
const validateProduct = require('../middlewares/validateProductName');

const route = express.Router(); 

route.get('/', productController.getAllProducts);
route.post('/', validateProduct, productController.createProducts);
route.get('/:id', productController.getProductsById);
route.put('/:id', validateProduct, productController.updateProducts);

module.exports = route;