import db from '../../pestgre/db.js'
import { response, validate } from './controller.handler.js'

class Controller {
	addLink(req, res) {
		// validate data
		if(!validate(req, res))
			return false

		res.json({status: ['Link has been created !']})
	}
	deleteLink(req, res) {
		res.json({status: 'ok'})
	}
}

export default Controller