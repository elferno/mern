// imports
import { Router } from 'express'
import Controller from '../controllers/user.controller.js'

// var
const router = Router()
const controller = new Controller()

// local functions
const eject = (res, status, message) => res.status(status).json({message})

// routing
router.post  ('/',    controller.createUser)
router.get   ('/:id', controller.getUser)
router.put   ('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser)

// export
export default router