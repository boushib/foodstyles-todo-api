import { pool } from '../db'

export class UserRepo {
  static async findWithEmailAndPassword({ email, password }: { email: string; password: string }) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1 AND password = $2;`, [
      email,
      password,
    ])
    return rows[0]
  }

  static async create({
    name,
    email,
    password,
  }: {
    name: string
    email: string
    password: string
  }) {
    const { rows } = await pool.query(
      `INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *;`,
      [name, email, password]
    )
    return rows[0]
  }
}
