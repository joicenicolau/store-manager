const connection = require('./connections');
// console.log(connection);

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );
  return result;
};

// pesquisa: https://github.com/tryber/sd-027-a-live-lectures/blob/lecture/back/5.5/src/models/userModel.js
const getProductsById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return result;
};

const createProducts = async ({ name }) => {
  const [{ InsertId }] = await connection.execute(
    'INSERT INTO StoreManager.products(name) VALUES(?);',
    [name],
  );
  return { id: InsertId, name };
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProducts,
};