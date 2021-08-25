import {validationResult} from 'express-validator'

const response = (
	res,
	[ok_status, ok_data],
	[err_status, err_data] = [404, 'unhandled error']
) => {
	if (ok_data) res.status(ok_status).json(ok_data)
	else res.status(err_status).json(err_data)
}

const validate = (req, res) => {
	const error = validationResult(req)

	if (!error.isEmpty()) {
		response(
			res,
			[400, error.array()]
		)
		return false
	}

	return true
}

export {response, validate}