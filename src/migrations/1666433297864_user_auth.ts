import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

exports.shorthands = undefined

export const up = async (pgm: MigrationBuilder): Promise<void> => {
  pgm.sql(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `)
}

export const down = async (pgm: MigrationBuilder): Promise<void> => {
  pgm.sql(`
    DROP TABLE users;
  `)
}
