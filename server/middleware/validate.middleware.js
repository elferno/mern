import { validationResult } from 'express-validator'

export default function (req, res, next) {
	// get errors if exists
	const errorHandler = validationResult(req)

	// spon validation errors - drop
	if (!errorHandler.isEmpty())
		return res.status(400).json({status: errorHandler.array().map(e => e.msg)})

	// continue handling flow
	next()
}