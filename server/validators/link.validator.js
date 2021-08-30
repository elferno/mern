import { check } from 'express-validator'

// describe validator
const validator = {
	create: [
		check('link', 'please, insert the link to handle')
			.exists()
			.isLength({min: 5})
	]
}

// export
export default validator