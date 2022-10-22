/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export const up = async (pgm: MigrationBuilder): Promise<void> => {
  pgm.sql(`
    CREATE TYPE TodoItemStatus AS ENUM ('IN_PROGRESS', 'COMPLETED');

    CREATE TABLE todos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      status TodoItemStatus DEFAULT 'IN_PROGRESS',
      user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `)
}

export const down = async (pgm: MigrationBuilder): Promise<void> => {
  pgm.sql(`
    DROP TABLE todos;
    DROP TYPE TodoItemStatus;
  `)
}
