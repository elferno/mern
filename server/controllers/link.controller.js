import config from 'config'
import shortid from 'shortid'
import db from '../../pestgre/db.js'

class Controller {
	async addLink(req, res) {
		// read user data
		const baseURL = config.get('Server.baseURL')
		const owner = req.token.userID
		const originLink = req.body.link

		// check if the link is already shorted for this user
		const exists = await db.query(
			`SELECT * from links WHERE origin=$1 AND owner=$2`,
			[originLink, owner]
		)
		if (exists.rows.length)
			return res.status(409).json({status: [`short link already exists: ${exists.rows[0].short}`]})

		// shorter the link
		const linkCode = shortid.generate()
		const shortLink = `${baseURL}/sh/${linkCode}`

		// add link to DB
		const link = await db.query(
			`INSERT INTO links (origin, short, owner, date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *;`,
			[originLink, shortLink, owner]
		)

		// error link adding
		if (link.rows.length === 0)
			return res.status(400).json({status: [`something went wrong, reload page and try again`]})

		res.json({status: [`link has been created: ${link.rows[0].short}`]})
	}
	async getAllLinks(req, res) {
		// read user ID
		const owner = req.token.userID

		// read all user links from DB
		const links = await db.query(
			`SELECT * from links WHERE owner=$1`,
			[owner]
		)

		// if no links found
		if (links.rows.length === 0)
			return res.status(400).json({status: [`no links here`]})
		
		// return links: [{id, date, origin, short, owner}, {...}, ...]
		res.json(links.rows)
	}
	async getLinkById(req, res) {
		// read user ID and link ID
		const owner = req.token.userID
		const id = req.params.id

		// read certain user links from DB
		const links = await db.query(
			`SELECT * FROM links WHERE owner=$1 AND id=$2`,
			[owner, id]
		)

		// if no links found
		if (links.rows.length === 0)
			return res.status(400).json({status: [`no links here`]})

		// return certain link: {id, date, origin, short, owner}
		res.json(links.rows[0])
	}
	async deleteLink(req, res) {
		// read user ID and link ID
		const owner = req.token.userID
		const id = req.params.id

		// delete link
		await db.query(
			`DELETE FROM links WHERE owner=$1 AND id=$2`,
			[owner, id]
		)

		const links = await db.query(
			`SELECT COUNT(id) from links WHERE owner=$1`,
			[owner]
		)

		// if no links left
		if (links.rows[0].count == 0)
			return res.status(400).json({status: [`no links here`]})

		res.json({})
	}
}

export default Controller