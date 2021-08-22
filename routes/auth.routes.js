// imports
import config from 'config'
import bcrypt from 'bcryptjs'
import { Router } from "express";
import User from '../models/User.js'

// var
const router = Router()
const API = {
	'register': config.get('Api.auth.register'),
	'login': config.get('Api.auth.login')
}

// local functions
const eject = (res, status, message) => res.status(status).json({message})

// routing
router.post(API.register, async (req, res) => {
	try {
		// income var
		const {login, t_pass} = req.body
		const pass = bcrypt.hash(t_pass)

		// check if login exists
		if (await User.findOne({login}))
			return eject(res, 400, `user "${login}" already exists`)

		// add user
		

	} catch (e) {
		return eject(res, 500, `[register]: something went wrong`)
	}
})

router.post(API.login, async (req, res) => {

})

// export
export default router