// imports
import express from 'express'
import config from 'config'
import mongoose from 'mongoose'

// vars
const SERVER = {
	'port': config.get('Server.port') || 3000,
	'log': () => console.log(`server is raised on port ${SERVER.port} ...`)
}
const DB = {
	'url': config.get('DB.url'),
	'prefs': config.get('DB.prefs')
}

// server start function
const start = async () => {
	try {
		// db conenct
		await mongoose.connect(DB.url, DB.prefs)
		// start server
		express().listen(SERVER.port, SERVER.log)
	} catch(e) {
		// somethin went horribly wrong
		console.log('Server error', e.message)
		process.exit(1)
	}
}

// start the server
start()