// imports
import bcrypt from 'bcryptjs'
import config from 'config'
import jwt from 'jsonwebtoken'
import db from '../../pestgre/db.js'
import { response, validate } from './controller.handler.js'

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

		// check if password doesn't match OR no user selected
		const userExists = user.rows.length
		const passwordMatch = userExists && await bcrypt.compare(pass, user.rows[0].pass)
		if (!userExists || !passwordMatch)
			return response(
				res,
				[400, {status: [`wrong login or password`]}]
			)

		// authorized: create token
		const userID = user.rows[0].id
		const token = jwt.sign(
			{userID},
			config.get('JWT.secret'),
			{expiresIn: config.get('JWT.expires')}
		)

		// return token
		response(
			res,
			[200, {token, userID}]
		)
	}
}

// export
export default Controller