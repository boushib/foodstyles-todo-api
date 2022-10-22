# FoodStyles Todo

This is the backend API for _FoodStyles_ a minimal & clean todo application to help you track your daily tasks.

## Dependencies

- Node.js
- TypeScript
- PostgreSQL
- Yarn
- Prettier

## Dev Environment

Create a `.env` file in your frontend root directly and include this environment variables.

```text
PORT=8080
JWT_SECRET=c9012455-c62d-4313-bb0e-a29e237daa17
DATABASE_URL=postgresql://[username]:[password]@localhost/foodstyles
DB_USER=postgres
DB_HOST=localhost
DB_PASSWORD=...
DB_NAME=foodstyles
DB_PORT=5432
```

Install dependencies

```text
yarn
```

To run migrations, make sure your postgres database instance is up and running, then run this script

```
yarn migrate up
```

Run the server in development mode. (This will automatically run the sever on port `8080` if no port is specified as env variable)

```text
yarn dev
```

Builds the server for production

```text
yarn build
```
