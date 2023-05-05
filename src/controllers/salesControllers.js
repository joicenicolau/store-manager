const salesServices = require('../services/salesServices');

const addSale = async (req, res) => {
  const result = await req.body;

  const sales = await salesServices.addSales(result);

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
  
  if (result.length === 0) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(result);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const result = await salesServices.deleteSale(id);

  if (result.type) return res.status(result.type).json({ message: result.message });

  return res.sendStatus(204);
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const result = await req.body;

  const sales = await salesServices.updateSales(id, result);

  if (sales.type) return res.status(sales.type).json({ message: sales.message });

  if (sales.type === null) {
    return res.status(200).json({ saleId: id, itemsUpdated: result });
  }
};

module.exports = {
  addSale,
  getAllSales,
  getSalesById,
  deleteSale,
  updateSales,
};