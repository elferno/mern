// imports
import bcrypt from 'bcryptjs'
import db from '../../pestgre/db.js'
import {response, validate} from './controller.handler.js'

// handle actions
class Controller {
	async createUser(req, res) {
		// check validation
		if(!validate(req, res))
			return false

		// read data
		const { login, pass } = req.body
		const password = await bcrypt.hash(pass, 12)

		// try add user to db
		const new_user = await db.query(`
			INSERT INTO "user" 
				("login", "pass", "links") 
				VALUES ($1, $2, $3) 
				ON CONFLICT ("login") DO NOTHING 
				RETURNING *
			;`,
			[login, password, null]
		)

		// return new user: {id, login, pass (hashed), links} OR error
		response(
			res,
			[201, new_user.rows[0]],
			[400, {status: [`user with login '${login}' already exists`]}]
		)
	}
	async getUser(req, res) {
		// read id
		const id = req.params.id

		// get user by ID
		const user = await db.query(
			`SELECT "id", "login", "links" FROM "user" WHERE "id"=$1 LIMIT 1;`,
			[id]
		)

		// return user: {id, login, pass (hashed), links}
		response(
			res,
			[201, user.rows[0]],
			[404, {status: [`no user with ID '${id}' found`]}]
		)
	}
	async updateUser(req, res) {
		// read data
		const id = req.params.id
		const { login, pass, links } = req.body
		const password = await bcrypt.hash(pass, 12)

		// update user
		const user = await db.query(
			`UPDATE "user" SET "login"=$2, "pass"=$3, "links"=$4 WHERE "id"=$1 RETURNING *;`,
			[id, login, password, links]
		)

		// return updated user: {id, login, pass (hashed), links}
		response(
			res,
			[201, user.rows[0]],
			[404, {status: [`no user with ID '${id}' found`]}]
		)
	}
	async deleteUser(req, res) {
		// read data
		const id = req.params.id

		// delete user
		const user = await db.query(
			`DELETE FROM "user" WHERE "id"=$1 RETURNING *;`,
			[id]
		)

		// return deleted info: {id, login, pass (hashed), links}
		response(
			res,
			[201, user.rows[0]],
			[404, {status: [`no user with ID '${id}' found`]}]
		)
	}
}

// export
export default Controller