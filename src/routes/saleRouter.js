const express = require('express');
const salesControllers = require('../controllers/salesControllers');
const validateSale = require('../middlewares/validateNewSales');

const route = express.Router(); 

route.post('/', validateSale, salesControllers.addSale);

module.exports = route;