require('dotenv').config();
const config = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER, 
    DB_PASSWORD: process.env.DB_PASSWORD, 
    DB_CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMIT || 1000,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT || 5432
}
module.exports = config;