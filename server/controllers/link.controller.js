import db from '../../pestgre/db.js'
import { response } from '../response.handler.js'

class Controller {
	async addLink(req, res) {
		res.json({status: ['Link has been created !']})
	}
	async getAllLinks(req, res) {
		// read user ID
		const _owner = req.token.userID

		// read all user links from DB
		const _links = await db.query(
			`SELECT * from links WHERE owner=$1`,
			[_owner]
		)

		// return links: [{id, date, origin, short, owner}, {...}, ...]
		response(
			res,
			[200, _links.rows],
			[400, {status: [`no links here`]}]
		)
	}
	async getLinkById(req, res) {
		// read user ID nad link ID
		const _owner = req.token.userID
		const _id = req.params.id

		// read certain user links from DB
		const _links = await db.query(
			`SELECT * from links WHERE owner=$1 AND id=$2`,
			[_owner, _id]
		)

		// return certain link: {id, date, origin, short, owner}
		response(
			res,
			[200, _links.rows[0]],
			[400, {status: [`no links here`]}]
		)
	}
	async deleteLink(req, res) {
		res.json({message: 'ok'})
	}
}

export default Controller