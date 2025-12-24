const express = require("express");
const mariadb = require("mariadb");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MariaDB connection pool
const pool = mariadb.createPool({
    host: "localhost",
    user: "appuser",
    password: "1234",
    database: "shopdb",
    connectionLimit: 5
});

// Test route
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
