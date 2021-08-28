// system
import { Router } from 'express'
import Validator from '../validators/link.validator.js'
import Controller from '../controllers/link.controller.js'

// var
const router = new Router()
const validator = Validator
const controller = new Controller()

// routing
router.post  ('/link',     validator.create, controller.addLink)
router.delete('/link/:id', validator.delete, controller.deleteLink)

// export
export default router