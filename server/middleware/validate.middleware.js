import { validationResult } from 'express-validator'
import { response } from '../response.handler.js'

export default function (req, res, next) {
	// get errors if exists
	const errorHandler = validationResult(req)

	// spon validation errors - drop
	if (!errorHandler.isEmpty()) {
		return response(
			res,
			[400, {status: errorHandler.array().map(e => e.msg)}]
		)
	}

	// continue handling flow
	next()
}