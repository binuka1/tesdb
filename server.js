// Install: npm install express mariadb cors
const express = require("express");
const mariadb = require("mariadb");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MariaDB pool
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "vendix", // your MariaDB password
  database: "shopdb",
  connectionLimit: 5
});

// Endpoint: get all products
app.get("/products", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
});

app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
