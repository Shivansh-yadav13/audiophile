const Pool = require("pg").Pool;
require("dotenv").config();

const developerConfig = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
});

const productionConfig = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const pool =
  process.env.NODE_ENV === "production" ? productionConfig : developerConfig;

module.exports = pool;
