import { pool } from '../db'

// deleteTodo(id)
// listTodos

export class TodoRepo {
  static async get(userId: number) {
    try {
      const { rows } = await pool.query(`SELECT * FROM todos WHERE user_id = $1;`, [userId])
      return rows
    } catch (error) {
      console.log({ error })
    }
  }

  static async getById(id: number) {
    try {
      const { rows } = await pool.query(`SELECT * FROM todos WHERE id = $1;`, [id])
      return rows[0]
    } catch (error) {
      console.log({ error })
    }
  }

  static async create({ title, userId }: { title: string; userId: number }) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO todos (title, user_id) VALUES($1, $2) RETURNING *;`,
        [title, userId]
      )
      return rows[0]
    } catch (error) {
      console.log({ error })
    }
  }

  static async updateStatus({ id, status }: { id: number; status: string }) {
    try {
      const { rows } = await pool.query(
        `UPDATE todos SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *;`,
        [status, id]
      )
      return rows[0]
    } catch (error) {
      console.log({ error })
    }
  }

  static async delete(id: number) {
    try {
      const { rows } = await pool.query(`DELETE FROM todos WHERE id = $1 RETURNING *;`, [id])
      return rows[0]
    } catch (error) {
      console.log({ error })
    }
  }
}
