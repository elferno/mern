import config from 'config'
import jwt from 'jsonwebtoken'

export default function (req, res, next) {
	// try read token from headers
	const token = req.headers.authorization
		? req.headers.authorization.split(' ')[1]
		: false

	// if no token found - drop
	if (!token)
		return res.status(401).json({})

	// save decoded token to `req.token`
	try { req.token = jwt.verify(token, config.get('JWT.secret')) }
	catch (e) { return res.status(401).json({}) }

	// continue handling flow
	next()
}