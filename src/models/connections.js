// pesquisa: https://github.com/tryber/sd-027-a-live-lectures/tree/lecture/back/5.4/src/models
// docker-compose
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: 'StoreManager',
});

module.exports = connection;