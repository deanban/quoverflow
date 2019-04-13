const { Pool } = require('pg')
const dotenv = require('dotenv')

const ENV_VARS = dotenv.config()

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_DEV_HOST,
	database: process.env.DATABASE,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
	max: process.env.MAX,
	connectionString: process.env.DATABASE_URL
})

pool.on('error', function(err, client) {
	console.error('idle client error', err.message, err.stack)
})

module.exports.query = function(text, values, callback) {
	console.log('query:', text, values)
	return pool.query(text, values, callback)
}

module.exports.connect = function(callback) {
	return pool.connect(callback)
}
