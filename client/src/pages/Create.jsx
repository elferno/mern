// system
import React, { useState, useContext } from 'react'

// context
import { AuthContext } from '../context/AuthContext'

// hooks
import { useHttp } from '../hooks/http.hook.jsx'

// components
import { Input } from '../components/Input'
import { Button } from '../components/Button'

// css
import g_css from '../styles/Global.module.css'
import l_css from '../styles/Create.module.css'
const css = {...g_css, ...l_css}

export const Create = () => {
	// local state
	const [link, setLink] = useState('')

	// hooks
	const auth = useContext(AuthContext)
	const { httpLoading, httpRequest, httpStatus, clearHttpStatus } = useHttp(auth.logout)

	// handlers
	const inputHandler = event => {
		setLink(event.target.value)
	}
	const createHandler = async event => {
		// try create link
		const newLink = await httpRequest('/api/links', 'POST', {link}, {authorization: `Bearer ${auth.token}`})
		// if success
		if(newLink)
			event.target.parentNode.parentNode.reset()
	}

	return (
		<div className={css.container}>
			<form className={css.create_container}>
				<Input
					type="text"
					id="link"
					value={link}
					focus={clearHttpStatus}
					handler={inputHandler}
					placeholder="insert your link here"
				/>
				<Button
					type='blue'
					click={createHandler}
					disabled={httpLoading}
				>
					create
				</Button>
			</form>
			<div className={css.create_status}>{httpStatus}</div>
		</div>
	)
}