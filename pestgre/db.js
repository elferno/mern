import pg from 'pg'
import config from 'config'

const db = new pg.Pool({
	user: config.get('DB.user'),
	password: config.get('DB.pass'),
	host: config.get('DB.host'),
	port: config.get('DB.port'),
	database: config.get('DB.database')
})

export default db