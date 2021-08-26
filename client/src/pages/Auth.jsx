// system
import React, { useState } from 'react'

// hooks
import { useHttp } from '../hooks/http.hook.jsx'

// css
import g_css from '../styles/Global.module.css'
import l_css from '../styles/Auth.module.css'
const css = {...g_css, ...l_css}

// export component
export const Auth = () => {
	// http requests
	const { httpLoading, httpRequest, httpError, clearHttpError } = useHttp()

	// local state for login/pass inputs
	const [form, setForm] = useState({
		login: '',
		pass: ''
	})

	// handlers
	const changeHandler = event => {
		setForm({
			...form,
			[event.target.name]: event.target.value
		})
	}
	const registerHandler = async () => {
		if (httpLoading) return
		const createUser = await httpRequest('/api/user', 'POST', {...form})
 		console.log('createUser:', createUser)
	}
	const loginHandler = async () => {
		if (httpLoading) return
		const loginUser = await httpRequest('/api/login', 'POST', {...form})
 		console.log('loginUser:', loginUser)
	}

	// return JSX
	return (
		<div className={css.container}>
			<h1 className={css.header}>Auth Page</h1>
			<form className={css.login_container}>
				<input
					type="text"
					id="login"
					name="login"
					autoComplete="none"
					placeholder="login"
					onFocus={clearHttpError}
					onChange={changeHandler}
				/>
				<input
					type="password"
					id="pass"
					name="pass"
					autoComplete="none"
					placeholder="password"
					onFocus={clearHttpError}
					onChange={changeHandler}
				/>
				<div 
					className={`${css.button} ${css.button_red}`}
					onClick={loginHandler}
					disabled={httpLoading}
				>
					enter
				</div>
				<div 
					className={`${css.button} ${css.button_blue}`}
					onClick={registerHandler}
					disabled={httpLoading}
				>
					register
				</div>
			</form>
			<div className={css.login_error}>{httpError}</div>
		</div>
	)
}