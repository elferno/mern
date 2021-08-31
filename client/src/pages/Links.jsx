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
	const [deleting, setDeleting] = useState(null)

	// hooks
	const auth = useContext(AuthContext)
	const { httpLoading, httpRequest, httpStatus } = useHttp(auth.logout)

	// local elements
	const insertLinks = links =>
		links.map((link, key) => 
			<div key={key} className={css.link_line}>
				<div className={css.link_id}>{key + 1}.</div>
				<div><a href="{link.short}" target="_blank">{link.short}</a></div>
				<div><a href="{link.origin}" target="_blank">{link.origin}</a></div>
				<div className={css.link_prefs}>
					<Button 
						type="blue" 
						click={() => deleteHandler(link.id)} 
						disabled={deleting === link.id}
					>
						delete
					</Button>
				</div>
			</div>
		)

	// handlers
	const deleteHandler = async id => {
		setDeleting(id)
		const linksLeft = await httpRequest(`/api/links/${id}`, 'DELETE', null, {authorization: `Bearer ${auth.token}`})
		setDeleting(null)
		setLinks(linksLeft ? links.filter(link => link.id !== id) : null)
	}

	// effects
	useEffect(() => (
		async () => {
			const dbLinks = await httpRequest('/api/links', 'GET', null, {authorization: `Bearer ${auth.token}`})
			if (dbLinks) setLinks(dbLinks)
		}
	)(), [httpRequest, auth.token])

	// return JSX
	return (
		<div className={css.container}>
			<div className={css.links_container}>
				{
					(httpLoading && links === null && <p className="status_error">loading...</p>)
					|| (links !== null && insertLinks(links))
					|| httpStatus
				}
			</div>
		</div>
	)
}