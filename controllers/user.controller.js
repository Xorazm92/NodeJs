import { pool } from "../config/db.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, fullname } = req.body;

    const data = await pool.query(
      "Insert into users (name, email, password,fullname,  creat_at, update_at) Values ($1, $2, $3, $4, now(), now()) returning id, name, email",
      [name, email, password, fullname]
    );
    res.status(201).send(data.rows);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const login = async (res, req) => {
  try {
    const { email, password } = req.body;
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (rows.length === 0)
      return res.status(401).json({ error: "User not found" });

    const user = rows[0];
    if (user.password !== password)
      return res.status(401).json({ error: "Invalid password" });
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { row } = await pool.query(
      "Select id, name, email, fullname FROM users where id =$1",
      [id]
    );

    if (rows.length === 0)
      return res.status(401).json({ error: "User not found" });

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
