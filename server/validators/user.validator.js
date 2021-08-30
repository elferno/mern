// imports
import {check} from 'express-validator'

// describe validator
const validator = {
	create: [
		check('login', 'login must be from 3 up to 20 symbols')
			.isLength({min: 3, max: 20}),
		check('pass', 'password must be from 6 up to 30 symbols')
			.isLength({min: 6, max: 30})
	]
}

// export
export default validator