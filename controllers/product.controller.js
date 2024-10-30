import { pool } from "../config/db.js";

export const productController = {
  async createProduct(req, res) {
    try {
      const { user_id, name } = req.body;
      const { rows } = await pool.query(
        "INSERT INTO product (user_id, name, creat_at, update_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *",
        [user_id, name]
      );
      res.status(201).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllProducts(req, res) {
    try {
      const { rows } = await pool.query("SELECT * FROM product");
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const { rows } = await pool.query(
        "UPDATE product SET name = $1, update_at = NOW() WHERE id = $2 RETURNING *",
        [name, id]
      );
      if (rows.length === 0) return res.status(404).json({ error: "Product not found" });
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const { rowCount } = await pool.query("DELETE FROM product WHERE id = $1", [id]);
      if (rowCount === 0) return res.status(404).json({ error: "Product not found" });
      res.json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getFilterProducts(req, res) {
    try {
      const { category, priceRange, page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;


      let query = "SELECT * FROM product WHERE 1=1";
      const queryParams = [];

      if (category) {
        queryParams.push(category);
        query += ` AND category = $${queryParams.length}`;
      }

      if (priceRange) {
        queryParams.push(priceRange);
        query += ` AND price <= $${queryParams.length}`;
      }

      query += ` LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
      queryParams.push(limit, offset);

      const { rows: products } = await pool.query(query, queryParams);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
};
