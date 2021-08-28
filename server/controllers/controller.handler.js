import {validationResult} from 'express-validator'

const response = (
	res,
	[ok_status, ok_data],
	[err_status, err_data] = [404, 'unhandled error']
) => {
	if (ok_data) {
		if (ok_data.pass) ok_data.pass = '*'
		res.status(ok_status).json(ok_data)
	}
	else res.status(err_status).json(err_data)
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

export {response, validate}