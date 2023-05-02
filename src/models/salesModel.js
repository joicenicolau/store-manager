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

// retirei a sale_id do select, teste estava pedindo
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
  // console.log('linha 46', result); 
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
  const result = await connection.execute(
    `UPDATE StoreManager.sales_products 
    SET product_id = (?), quantity = (?) WHERE sale_id = (?) AND product_id = (?);`,
    [name.productId, id, name.quantity],
  );
  console.log('linha 64', result);
  return { type: null };
};

module.exports = {
  addSales,
  getAllSales,
  getSalesById,
  deleteSale,
  updateSales,
};
