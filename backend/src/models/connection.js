const mysql = require("mysql2/promise");
const fs = require("fs");
require("dotenv").config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  ssl: {
    ca: fs.readFileSync(
      "/project/home/olucasoliveira/workspace/backend/src/models/certificates/SSL.crt",
    ),
  },
});

module.exports = connection;
