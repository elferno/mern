// imports
import bcrypt from 'bcryptjs'
import db from '../../pestgre/db.js'

// handle actions
class Controller {
	async createUser(req, res) {
		// read data
		const { login, pass } = req.body
		const password = await bcrypt.hash(pass, 12)

		// try add user to db
		const new_user = await db.query(
			`INSERT INTO users (login, pass) VALUES ($1, $2) ON CONFLICT (login) DO NOTHING RETURNING *;`,
			[login, password]
		)

		// if no user found
		if (new_user.rows.length === 0)
			return res.status(400).json({status: [`user with login '${login}' already exists`]})
		
		// return new user: {id, login, pass (hashed), links} OR error
		res.json(new_user.rows[0])
	}
	async getUserById(req, res) {
		// read id
		const id = req.params.id

		// get user by ID
		const user = await db.query(
			`SELECT id, login, links FROM users WHERE id=$1 LIMIT 1;`,
			[id]
		)

		// if no user found
		if (user.rows.length === 0)
			return res.status(400).json({status: [`no user with ID '${id}' found`]})
		
		// return user: {id, login, pass (hashed), links}
		res.json(user.rows[0])
	}
	async updateUser(req, res) {
		// read data
		const id = req.params.id
		const { login, pass, links } = req.body
		const password = await bcrypt.hash(pass, 12)

		// update user
		const user = await db.query(
			`UPDATE users SET login=$2, pass=$3, links=$4 WHERE id=$1 RETURNING *;`,
			[id, login, password, links]
		)

		// if no user found
		if (user.rows.length === 0)
			return res.status(400).json({status: [`no user with ID '${id}' found`]})
		
		// return updated user: {id, login, pass (hashed), links}
		res.json(user.rows[0])
	}
	async deleteUser(req, res) {
		// read data
		const id = req.params.id

		// delete user
		const user = await db.query(
			`DELETE FROM users WHERE id=$1 RETURNING *;`,
			[id]
		)

		// if no user found
		if (user.rows.length === 0)
			return res.status(400).json({status: [`no user with ID '${id}' found`]})
		
		// return deleted info: {id, login, pass (hashed), links}
		res.json(user.rows[0])
	}
}

// export
export default Controller