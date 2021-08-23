import pg from 'pg'

const db = new pg.Pool({
	user: 'postgres',
	password: 'postgrez',
	host: 'localhost',
	port: 5432,
	database: 'mern'
})

export default db