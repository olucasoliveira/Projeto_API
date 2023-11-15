const mysql = require("mysql2/promise");
const fs = require("fs");
require("dotenv").config();


const connection = mysql.createPool({
  connectionLimit : 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_DB_PORT
});


module.exports = connection;
