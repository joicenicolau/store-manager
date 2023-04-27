const salesServices = require('../services/salesServices');

const addSale = async (req, res) => {
  const result = await req.body;

  const sales = await salesServices.addSales(result);

  if (sales.type) return res.status(sales.type).json({ message: sales.message });

  return res.status(201).json(sales.message);
};

module.exports = { addSale };