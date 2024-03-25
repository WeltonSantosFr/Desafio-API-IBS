import '.dotenv'

module.exports = {
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": process.env.POSTGRES_USER,
  "password": process.env.POSTGRES_PASSWORD,
  "database": process.env.POSTGRES_DB,
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
