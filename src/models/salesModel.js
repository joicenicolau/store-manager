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

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = (?);',
    [id],
  );
  return { type: null };
};

const updateSales = async (id, name) => {
  await connection.execute(
    `UPDATE StoreManager.sales_products 
    SET product_id = (?), quantity = (?) WHERE sale_id = (?) AND product_id = (?);`,
    [name.productId, name.quantity, id, name.productId],
  );
  return { type: null };
};
  
const getSale = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = (?);',
    [id],
  );
  return result[0];
};

module.exports = {
  addSales,
  getAllSales,
  getSalesById,
  deleteSale,
  updateSales,
  getSale,
};
