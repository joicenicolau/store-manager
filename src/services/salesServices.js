const salesModels = require('../models/salesModel');
const productModels = require('../models/productsModels');

const productArray = async (prod) => {
  const products = (await productModels.getAllProducts()).map((e) => e.id);
  let result = {};

  prod.forEach((e) => {
    if (!products.includes(e.productId)) {
      result = { type: 404, message: 'Product not found' };
    }
  });
  return result;
};

const addSales = async (sale) => {
  const result = await productArray(sale);
  if (result.type) return result; 

  const newSale = await salesModels.addSales(sale);
  return { type: null, message: newSale };
};

module.exports = { addSales };