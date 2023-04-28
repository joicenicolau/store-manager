const connection = require('./connections');

const addSales = async (sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );

  // sem a mentoria do Jordan do dia 27/04 as 13h, do Ronald. Seria impossível fazer esse map e o promisse.all sozinha. Obrigada pela dica Ronald
  const promises = sale.map(({ productId, quantity }) => connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [insertId, productId, quantity],
  ));
  
  await Promise.all(promises);

  return { id: insertId, itemsSold: sale };
};

// Dica do Ronald na mentoria tb, já renomear para as chaves que preciso para não precisar usar o camelize
const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT 
      ps.sale_id AS saleId, 
      s.date AS date, 
      ps.product_id AS productId, 
      ps.quantity AS quantity 
    FROM StoreManager.sales_products AS ps 
    INNER JOIN StoreManager.sales AS s ON s.id = ps.sale_id 
    ORDER BY ps.sale_id, ps.product_id;`,
  );
  return result;
};

const getSalesById = async (id) => {
  const [result] = await connection.execute(
    `SELECT 
      s.date AS date, 
      ps.product_id AS productId, 
      ps.quantity AS quantity 
    FROM StoreManager.sales_products AS ps 
    INNER JOIN StoreManager.sales AS s ON s.id = ps.sale_id
    WHERE ps.sale_id = ?;`,
    [id],
  );
  return result;
};

module.exports = {
  addSales,
  getAllSales,
  getSalesById,
};
