import request from "./request.js"

const App = {
	users: [],
	async init() {
		const getUser = await request('/api/user/1')
		console.log('getUser:', getUser)
	}
}

document.addEventListener("DOMContentLoaded", App.init)