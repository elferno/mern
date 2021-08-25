// imports
import { Router } from 'express'
import Validator from '../validators/user.validator.js'
import Controller from '../controllers/user.controller.js'

// var
const router = Router()
const validator = Validator
const controller = new Controller()

// routing
router.post  ('/user/',    validator.create, controller.createUser)
router.get   ('/user/:id', validator.get,    controller.getUser)
router.put   ('/user/:id', validator.update, controller.updateUser)
router.delete('/user/:id', validator.delete, controller.deleteUser)

// export
export default router