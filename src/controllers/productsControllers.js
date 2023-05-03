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

  if (result.type) return res.status(result.type).json({ message: result.message });
  
  return res.status(201).json(result.message);
};

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // valida se um produto específico não é encontrado
  const resultByID = await productService.getProductsById(id);
  // console.log(resultByID);
  
  // esse diferente da sale aceitou a negação
  if (!resultByID) return res.status(404).json({ message: 'Product not found' });
  
  // validação já pronta no middleware
  const result = await productService.updateProducts(id, name);
  
  return res.status(200).json(result);
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;

  const result = await productService.deleteProducts(id);

  if (result.type) return res.status(result.type).json({ message: result.message });

  return res.sendStatus(204);
};

const searchProduct = async (req, res) => {
  const { q } = req.query;

  const result = await productService.searchProduct(q);
  
  return res.status(200).json(result);
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
  searchProduct, 
};