const connection = require('./connections');

const addSales = async (sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );

  // sem a mentoria do Jordan do dia 27/04 as 13h, do Ronal. Seria impossível fazer esse map e o promisse.all sozinha. Obrigada pela dica Ronald
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
