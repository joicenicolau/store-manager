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
  const resultByID = await productModels.getProductsById(id);
  
  if (!resultByID) return { type: 404, message: 'Product not found' };

  const result = await productModels.deleteProducts(id);
  return result; 
};

const searchProduct = async (q) => {
  const products = await productModels.searchProduct(q);
  return products;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
  searchProduct,
};