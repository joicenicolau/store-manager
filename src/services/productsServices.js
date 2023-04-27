// pesquisa: https://github.com/tryber/sd-027-a-live-lectures/blob/lecture/back/5.5/src/services/questionService.js
const productModels = require('../models/productsModels');
const validateRequestSchema = require('./validations/schemas');

const getAllProducts = async () => {
  const products = await productModels.getAllProducts();
  return products;
};

const getProductsById = async (id) => {
  const productsId = await productModels.getProductsById(id);
  return productsId;
};

const createProducts = async (name) => {
  const validations = validateRequestSchema.validateName(name);

  if (validations.type) return validations;

  const result = await productModels.createProducts(name);

  return result;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProducts,
};