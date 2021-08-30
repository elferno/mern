//system
import React, { useState, useEffect, useContext } from 'react'

// context
import { AuthContext } from '../context/AuthContext'

// hooks
import { useHttp } from '../hooks/http.hook.jsx'

// components
import { Button } from '../components/Button.jsx'

// css
import g_css from '../styles/Global.module.css'
import l_css from '../styles/Links.module.css'
const css = {...g_css, ...l_css}

export const Links = () => {
	// local state
	const [links, setLinks] = useState(null)

	// hooks
	const auth = useContext(AuthContext)
	const { httpLoading, httpRequest, httpStatus } = useHttp()

	// effects
	useEffect(() => {
		const getLinks = async () => {
			const _links = await httpRequest(
				'/api/links',
				'GET',
				null,
				{authorization: `Bearer ${auth.token}`}
			)
			if (_links && Array.isArray(_links))
				setLinks(createLinks(_links))
		}
		getLinks()
	}, [httpRequest, auth.token])

	// return JSX
	return (
		<div className={css.container}>
			<div className={css.links_container}>
				{
					(httpLoading && <p className="status_error">loading...</p>)
					|| links
					|| httpStatus
				}
			</div>
		</div>
	)
}

const createLinks = _links => {
	return _links.map((link, key) => 
		<div key={key} className={css.link_line}>
			<div className={css.link_id}>
				{link.id}.
			</div>
			<div><a href="{link.short}" target="_blank">{link.short}</a></div>
			<div><a href="{link.short}" target="_blank">{link.origin}</a></div>
			<div className={css.link_prefs}>
				<Button 
					type="red" 
				>
					view
				</Button>

				<Button 
					type="blue"
				>
					delete
				</Button>
			</div>
		</div>
	)
}