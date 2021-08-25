// imports
import { Router } from 'express'
import Validator from '../validators/login.validator.js'
import Controller from '../controllers/login.controller.js'

// var
const router = Router()
const validator = Validator
const controller = new Controller()

// create routing
router.post('/login', validator.login, controller.login)

// export
export default router