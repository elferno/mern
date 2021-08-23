import bcrypt from 'bcryptjs'
import db from '../../pestgre/db.js'

class UserController {
	async createUser(req, res) {
		
	}
	async getUser(req, res) {
		// read id
		const id = req.params.id
		// get user by ID
		const user = await db.query(
			`SELECT "id", "login", "links" FROM "user" WHERE "id"=$1 LIMIT 1;`,
			[id]
		)
		// return user: {id, login, links}
		res.json(user.rows.length
			? user.rows[0]
			: {status: `no user with ID '${id}' found`}
		)
	}
	async updateUser(req, res) {

	}
	async deleteUser(req, res) {

	}
}

export default UserController