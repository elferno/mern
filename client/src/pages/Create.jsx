// system
import React, { useState } from 'react'

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
	const [link, setLink] = useState(null)

	// hooks
	const { httpLoading, httpRequest, httpStatus, clearHttpStatus } = useHttp()

	// handlers
	const inputHandler = event => {
		setLink(event.target.value)
	}
	const createHandler = async event => {
		// try create link
		const _link = await httpRequest('/api/links', 'POST', {link})
		// if success
		if(_link) {
			// clear form fields
			event.target.parentNode.parentNode.reset()
			console.log(_link)
		}
	}

	return (
		<div className={css.container}>
			<form className={css.create_container}>
				<Input
					type="text"
					id="link"
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