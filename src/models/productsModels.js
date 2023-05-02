const connection = require('./connections');
// console.log(connection);

const getAllProducts = async () => {
  // uam única desestruturação, pois quero todos os elementos da lista
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );
  return result;
};

// pesquisa: https://github.com/tryber/sd-027-a-live-lectures/blob/lecture/back/5.5/src/models/userModel.js
const getProductsById = async (id) => {
  // dupla desestruturação, pois quero um único elemento da lista
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

// pesquisa: course - 2.4
const updateProducts = async (id, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = (?) WHERE id = (?);',
    [name, id],
  );
  return { id, name }; // retornar direto o id e name. 
};

const deleteProducts = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = (?);',
    [id],
  );
  return { type: null };
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
};