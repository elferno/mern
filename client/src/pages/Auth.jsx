// system
import React, { useState, useContext } from 'react'

// context
import { AuthContext } from '../context/AuthContext.jsx'

// components
import { Button } from '../components/Button.jsx'
import { Input } from '../components/Input.jsx'

// hooks
import { useHttp } from '../hooks/http.hook.jsx'

// css
import g_css from '../styles/Global.module.css'
import l_css from '../styles/Auth.module.css'
const css = {...g_css, ...l_css}

// export component
export const Auth = () => {
	// context
	const auth = useContext(AuthContext)

	// http requests hook
	const { httpLoading, httpRequest, httpStatus, clearHttpStatus } = useHttp()

	// local state for login/pass inputs
	const [form, setForm] = useState({
		login: '',
		pass: ''
	})

	// handlers
	const inputHandler = event => {
		setForm({
			...form,
			[event.target.name]: event.target.value
		})
	}
	const registerHandler = async () => {
		// dont execute while loading
		if (httpLoading) return
		// clear errors on new call
		clearHttpStatus()
		// create new user and call login function after
		await httpRequest('/api/user', 'POST', {...form}, {}, () => loginHandler())
	}
	const loginHandler = async () => {
		// dont execute while loading
		if (httpLoading) return
		// clear errors on new call
		clearHttpStatus()
		// get auth data
		const login = await httpRequest('/api/login', 'POST', {...form})
		// authenticate user
 		if (login)
			auth.login(login.token, login.userID)
	}

	// return JSX
	return (
		<div className={css.container}>
			<h1 className={css.header}>Auth Page</h1>
			<form className={css.login_container}>
				<Input
					type="text"
					id="login"
					value={form.login}
					focus={clearHttpStatus}
					handler={inputHandler}
					placeholder="login"
				/>
				<Input
					type="text"
					id="pass"
					value={form.pass}
					focus={clearHttpStatus}
					handler={inputHandler}
					placeholder="password"
				/>
				
				<Button 
					type="red" 
					click={loginHandler} 
					disabled={httpLoading}
				>
					enter
				</Button>

				<Button 
					type="blue" 
					click={registerHandler} 
					disabled={httpLoading}
				>
					register
				</Button>
			</form>
			<div className={css.login_error}>{httpStatus}</div>
		</div>
	)
}