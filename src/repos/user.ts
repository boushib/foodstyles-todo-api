import { pool } from '../db'

export class UserRepo {
  static async findByEmail(email: string) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email])
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
    try {
      const { rows } = await pool.query(
        `INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *;`,
        [name, email, password]
      )
      return rows[0]
    } catch (error) {
      console.log({ error })
    }
  }
}
