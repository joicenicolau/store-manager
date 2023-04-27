const connection = require('./connections');

const addSales = async (sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );

  const promises = sale.map(({ productId, quantity }) => connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [insertId, productId, quantity],
  ));
  
  await Promise.all(promises);

  return { id: insertId, itemsSold: sale };
};

module.exports = {
  addSales,
};
