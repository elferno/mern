// system
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// pages
import { Auth } from '../pages/Auth'
import { Links } from '../pages/Links'
import { Create } from '../pages/Create'
import { Detail } from '../pages/Detail'

// routes hook
export const UseRoutes = isAuth => {
	return isAuth
		? (
			<Switch>
				<Route path="/links" exact><Links /></Route>
				<Route path="/create" exact><Create /></Route>
				<Route path="/detail/:id"><Detail /></Route>
				<Redirect to="/create" />
			</Switch>
		) : (
			<Switch>
				<Route path="/" exact><Auth /></Route>
				<Redirect to="/" />
			</Switch>
		)
}