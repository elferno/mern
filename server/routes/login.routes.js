// imports
import { Router } from 'express'
import Validator from '../validators/login.validator.js'
import Controller from '../controllers/login.controller.js'

// middleware
import withValidation from '../middleware/validate.middleware.js'

// var
const router = Router()
const validator = Validator
const controller = new Controller()

// make authorization
router.post(
	'/login',
	validator.login,
	withValidation,
	controller.login
)

// export
export default router