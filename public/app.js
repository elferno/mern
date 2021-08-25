import request from "./request.js"

const App = {
	users: [],
	async init() {
		//const createUser = await request('/api/user', 'POST', {login: 'el', pass: '123'})
		//console.log('createUser:', createUser)

		//const getUser = await request('/api/user/1')
		//console.log('getUser:', getUser)

		//const updateUser = await request('/api/user/24', 'PUT', {login: 'el', pass: 'asd', links: ['https://xbeee.com/', 'https://google.com/']})
		//console.log('updateUser:', updateUser)

		//const deleteUser = await request('/api/user/24', 'DELETE')
		//console.log('deleteUser:', deleteUser)

		const login = await request('/api/login', 'POST', {login: 'el', pass: '123'})
		console.log('login:', login)
	}
}

document.addEventListener("DOMContentLoaded", App.init)