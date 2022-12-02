const Pool = require('pg').Pool
require('dotenv').config()

const { env } = process;

const pool = new Pool({
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    port: env.PORT,
    host: env.DB_HOST
})


module.exports = pool