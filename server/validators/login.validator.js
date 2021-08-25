// imports
import {check} from 'express-validator'

// describe validator
const validator = {
	login: [
		check('login', 'insert login')
			.exists()
			.isLength({min: 1}),
		check('pass', 'insert password')
			.exists()
			.isLength({min: 1})
	]
}

// export
export default validator