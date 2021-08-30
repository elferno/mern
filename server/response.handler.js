import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import config from 'config'

const response = (
	res,
	[ok_status, ok_data],
	[err_status, err_data] = [404, 'unhandled error']
) => {
	if (ok_data && Object.keys(ok_data).length) {
		if (ok_data.pass) ok_data.pass = '*'
		res.status(ok_status).json(ok_data)
	} else {
		res.status(err_status).json(err_data)
	}
}

const validate = (req, res) => {
	const errorHandler = validationResult(req)

	if (!errorHandler.isEmpty()) {
		const status = errorHandler.array().map(e => e.msg);
		response(
			res,
			[400, {status}]
		)
		return false
	}

	return true
}

const token = (req, res) => {
	// try read token from headers
	const _token = req.headers.authorization
		? req.headers.authorization.split(' ')[1]
		: false

	// if no token found - drop
	if (!_token)
		return false

	// return decoded token
	return jwt.verify(_token, config.get('JWT.secret'))
}

export {response, validate, token}