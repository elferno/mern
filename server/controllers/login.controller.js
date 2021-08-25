// imports
import bcrypt from 'bcryptjs'
import db from '../../pestgre/db.js'
import {response, validate} from './controller.handler.js'

// handle actions
class Controller {
	async login(req, res) {
		// validate data
		if(!validate(req, res))
			return false

		// read data
		const {login, pass} = req.body

		// try to get this user from DB
		const user = await db.query(
			`SELECT * FROM "user" WHERE "login"=$1 LIMIT 1;`,
			[login]
		)

		// if password doesn't match - drop selected user
		if (user.rows.length && ! await bcrypt.compare(pass, user.rows[0].pass))
			user.rows = []

		// response user: {id, login, pass (hashed), links}
		response(
			res,
			[200, user.rows[0]],
			[400, {error: `wrong login or password`}]
		)
	}
}

// export
export default Controller