import config from 'config'
import jwt from 'jsonwebtoken'
import { response } from '../response.handler.js'

export default function (req, res, next) {
	// try read token from headers
	const _token = req.headers.authorization
		? req.headers.authorization.split(' ')[1]
		: false

	// if no token found - drop
	if (!_token)
		return response(
			res,
			[400, {status: [`not authorized`]}]
		)

	// save decoded token to `req.token`
	req.token = jwt.verify(_token, config.get('JWT.secret'))

	// if no userID in token - drop
	if (!req.token || !req.token.userID)
		return response(
			res,
			[404, {status: [`no links for you`]}]
		)

	// continue handling flow
	next()
}