const connection = require('./connections');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );
  return result;
};

const getProductsById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return result;
};

const createProducts = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [name],
  );
  return insertId;
};

const updateProducts = async (id, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = (?) WHERE id = (?);',
    [name, id],
  );
  return { id, name }; 
};

const deleteProducts = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = (?);',
    [id],
  );
  return { type: null };
};

const searchProduct = async (q) => {
  console.log('search', q);
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE (?);',
    [`${q}%`],
  );
  return result;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
  searchProduct,
};