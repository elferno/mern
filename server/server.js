// imports
import config from 'config'
import express from 'express'
import {join, resolve} from 'path'
import UserRouter from './routers/user.router.js'
import LoginRouter from './routers/login.router.js'

// const
const SERVER = {
	port: config.get('Server.port'),
	started_log: () => console.log(`server is raised on port ${SERVER.port} ...`),
}
const ROUTER = {
	user : UserRouter,
	login: LoginRouter,
}

// var
const app = express()

// server prefs
app.use(express.json())

// routing
app.use('/api', ROUTER.user)
app.use('/api', ROUTER.login)

// start server
app.listen(SERVER.port, SERVER.started_log)