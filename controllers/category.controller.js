import { pool } from "../config/db.js";

const categoryController = {
  async createCategory(req, res) {
    try {
      const { name, description, par_id } = req.body;
      const { rows } = await pool.query(
        "INSERT INTO categoriya (name, description, par_id) VALUES ($1, $2, $3) RETURNING *",
        [name, description, par_id]
      );
      res.status(201).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllCategories(req, res) {
    try {
      const { rows } = await pool.query("SELECT * FROM categoriya");
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const { rowCount } = await pool.query("DELETE FROM categoriya WHERE id = $1", [id]);
      if (rowCount === 0) return res.status(404).json({ error: "Category not found" });
      res.json({ message: "Category deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default categoryController;
