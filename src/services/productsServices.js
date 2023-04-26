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

module.exports = { getAllProducts, getProductsById };