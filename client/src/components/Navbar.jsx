// imports
import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

// context
import { AuthContext } from '../context/AuthContext'

// css
import g_css from '../styles/Global.module.css'
import l_css from '../styles/Navbar.module.css'
const css = {...g_css, ...l_css}

// component
export const Navbar = () => {
	// var
	const history = useHistory()
	const auth = useContext(AuthContext)

	// handlers
	const logoutHandler = event => {
		event.preventDefault()
		auth.logout()
		history.push('/')
	}

	// return JSX
	return (
		<div className={`${css.container} ${css.navbar}`}>
			<NavLink to="/create">create<b>create</b></NavLink>
			<NavLink to="/links">my links<b>my links</b></NavLink>
			<div className={css.right_pannel}>
				<a href="/" onClick={logoutHandler}>exit<b>exit</b></a>
			</div>
		</div>
	)
}
