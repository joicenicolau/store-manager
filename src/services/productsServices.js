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

const updateProducts = async (id, name) => {
  const result = await productModels.updateProducts(id, name);
  return result; 
};

const deleteProducts = async (id) => {
  // valida se um produto específico não é encontrado
  const resultByID = await productModels.getProductsById(id);
  
  // esse diferente da sale aceitou a negação
  if (!resultByID) return { type: 404, message: 'Product not found' };

  const result = await productModels.deleteProducts(id);
  return result; 
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
};