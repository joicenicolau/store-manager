const salesModels = require('../models/salesModel');
const productModels = require('../models/productsModels');

// refatoração da validação do id. Sem o forEach. Resolvi utilizar o some, para tornar padrão com as outras validações de sale
const productArray = async (prod) => {
  const products = (await productModels.getAllProducts()).map((e) => e.id);
  const notFound = prod.some((e) => !products.includes(e.productId));
  if (notFound) {
    return { type: 404, message: 'Product not found' };
  }
  return {};
};

const addSales = async (sale) => {
  const result = await productArray(sale);
  if (result.type) return result; 

  const newSale = await salesModels.addSales(sale);
  return { type: null, message: newSale };
};

const getAllSales = async () => {
  const result = await salesModels.getAllSales();
  return result;
};

const getSalesById = async (id) => {
  const salesId = await salesModels.getSalesById(id);
  return salesId;
};

module.exports = {
  addSales,
  getAllSales,
  getSalesById,
};