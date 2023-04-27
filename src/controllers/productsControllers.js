// pesquisa: https://github.com/tryber/sd-027-a-live-lectures/blob/lecture/back/5.5/src/controllers/questionController.js
const productService = require('../services/productsServices');

const getAllProducts = async (_req, res) => {
  const result = await productService.getAllProducts();
  return res.status(200).json(result);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;

  const result = await productService.getProductsById(id);

  if (!result) return res.status(404).json({ message: 'Product not found' });

  // Será validado que é possível listar um produto específico com sucesso
  return res.status(200).json(result);
};

const createProducts = async (req, res) => {
  const { name } = req.body;

  const result = await productService.createProducts(name);

  return res.status(201).json(result.message);
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProducts,
};