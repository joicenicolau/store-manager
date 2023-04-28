const salesServices = require('../services/salesServices');

const addSale = async (req, res) => {
  const result = await req.body;

  const sales = await salesServices.addSales(result);

  // Será validado que não é possível realizar operações em uma venda com o campo `productId` inexistente, em um uinic array e em vários.
  // Deixei genérico aqui e valido no middleware
  if (sales.type) return res.status(sales.type).json({ message: sales.message });

  return res.status(201).json(sales.message);
};

const getAllSales = async (_req, res) => {
  const result = await salesServices.getAllSales();
  return res.status(200).json(result);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;

  const result = await salesServices.getSalesById(id);
  console.log(result);

  if (result.length === 0) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(result);
};

module.exports = {
  addSale,
  getAllSales,
  getSalesById,
};