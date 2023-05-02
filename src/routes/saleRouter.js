const express = require('express');
const salesControllers = require('../controllers/salesControllers');
const validateSale = require('../middlewares/validateNewSales');

const route = express.Router(); 

route.post('/', validateSale, salesControllers.addSale);
route.get('/', salesControllers.getAllSales);
route.get('/:id', salesControllers.getSalesById);
route.delete('/:id', salesControllers.deleteSale);

module.exports = route;