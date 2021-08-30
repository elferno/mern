// system
import { Router } from 'express'
import Validator from '../validators/link.validator.js'
import Controller from '../controllers/link.controller.js'

// middleware
import withAuth from '../middleware/auth.middleware.js'
import withValidation from '../middleware/validate.middleware.js'

// var
const router = new Router()
const validator = Validator
const controller = new Controller()

// add new link
router.post (
	'/links',
	withAuth,
	validator.create,
	withValidation,
	controller.addLink
)
// get all user links
router.get (
	'/links',
	withAuth,
	controller.getAllLinks
)
// get user link by id
router.get (
	'/links/:id',
	withAuth,
	controller.getLinkById
)
// delete link by id
router.delete(
	'/links/:id',
	withAuth,
	controller.deleteLink
)

// export
export default router