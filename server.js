// imports
import config from 'config'
import express from 'express'
import mongoose from 'mongoose'
import auth_routes from './routes/auth.routes.js'

// var
const server = express()
const DB = {
	'url': config.get('DB.url'),
	'prefs': config.get('DB.prefs')
}
const SERVER = {
	'port': config.get('Server.port') || 3000,
	'log': () => console.log(`server is raised on port ${SERVER.port} ...`),
}
const API = {
	'prefix': config.get('Api.auth.prefix')
}

// api routing
server.use(API.prefix, auth_routes)

// server start
const start = async () => {
	try {
		// db conenct
		await mongoose.connect(DB.url, DB.prefs)
		// start server
		server.listen(SERVER.port, SERVER.log)
	} catch(e) {
		// somethin went horribly wrong
		console.log('Server error', e.message)
		process.exit(1)
	}
}
start()