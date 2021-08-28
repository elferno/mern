// system
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// pages
import { Auth } from '../pages/Auth.jsx'
import { Links } from '../pages/Links.jsx'
import { Create } from '../pages/Create.jsx'
import { Detail } from '../pages/Detail.jsx'

// conponents
import { Navbar } from '../components/Navbar.jsx'

// routes hook
export const useRoutes = isAuth => {
	return isAuth
		? (
			<React.Fragment>
				<Navbar />
				<Switch>
					<Route path="/links" exact><Links /></Route>
					<Route path="/create" exact><Create /></Route>
					<Route path="/detail/:id"><Detail /></Route>
					<Redirect to="/create" />
				</Switch>
			</React.Fragment>
		) : (
			<Switch>
				<Route path="/" exact><Auth /></Route>
				<Redirect to="/" />
			</Switch>
		)
}