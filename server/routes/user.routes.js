// imports
import { Router } from 'express'
import Validator from '../validators/user.validator.js'
import Controller from '../controllers/user.controller.js'

// middleware
import withAuth from '../middleware/auth.middleware.js'
import withValidation from '../middleware/validate.middleware.js'

// var
const router = Router()
const validator = Validator
const controller = new Controller()

// create new user
router.post (
	'/user/',
	validator.create,
	withValidation,
	controller.createUser
)
// get user by id
router.get (
	'/user/:id',
	controller.getUserById
)
// update users data
router.put (
	'/user/:id',
	withAuth,
	controller.updateUser
)
// delete user
router.delete(
	'/user/:id', 
	withAuth,
	controller.deleteUser
)

// export
export default router