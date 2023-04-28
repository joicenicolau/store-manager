const express = require('express');
const salesControllers = require('../controllers/salesControllers');
const validateSale = require('../middlewares/validateNewSales');

const route = express.Router(); 

route.post('/', validateSale, salesControllers.addSale);
route.get('/:id', salesControllers.getSalesById);
route.get('/', salesControllers.getAllSales);

module.exports = route;