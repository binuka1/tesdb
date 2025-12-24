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
  password: "vendix",  // change if needed
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

// Listen on all interfaces for LAN access
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on http://10.112.201.237:${PORT}`));
