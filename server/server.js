// imports
import config from 'config'
import express from 'express'
import reload from 'reload'
import watch from 'watch'
import {createServer} from 'http'
import {join, resolve} from 'path'
import UserRouter from './routers/user.router.js'
import LoginRouter from './routers/login.router.js'

// const
const SERVER = {
	port: config.get('Server.port') || 3000,
	started_log: () => console.log(`server is raised on port ${SERVER.port} ...`),
}
const ROUTER = {
	user : UserRouter,
	login: LoginRouter,
}

// var
const app = express()
const baseDir = join(resolve(), 'public')
const homePage = join(baseDir, 'index.html')

// server prefs
app.use(express.json())
app.use(express.static(baseDir))

// routing
app.use('/api', ROUTER.user)
app.use('/api', ROUTER.login)

// home page
app.get('/', (req, res) => res.sendFile(homePage))

// create server
const startServer = async () => {
  const server = createServer(app)
  const reloadReturned = await reload(app)
  server.listen(SERVER.port, SERVER.started_log)
  watch.watchTree(baseDir, () => reloadReturned.reload())
}

// start
startServer()