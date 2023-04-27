// pesquisa: https://github.com/tryber/sd-027-a-live-lectures/blob/lecture/back/5.5/src/services/questionService.js
const productModels = require('../models/productsModels');

const getAllProducts = async () => {
  const products = await productModels.getAllProducts();
  return products;
};

const getProductsById = async (id) => {
  const productsId = await productModels.getProductsById(id);
  return productsId;
};

const createProducts = async (name) => {
  const result = await productModels.createProducts(name);
  return { type: null, message: { id: result, name } };
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProducts,
};