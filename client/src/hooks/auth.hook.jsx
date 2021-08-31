import { useState, useCallback } from 'react'

const USER_DATA = 'userData'

export const useAuth = () => {
	// user data
	const userData = JSON.parse(
		localStorage.getItem(USER_DATA)
		|| '{"token":null}'
	)

	// local state
	const [token, setToken] = useState(userData.token)

	// login
	const login = useCallback(uToken => {
		setToken(uToken)
		localStorage.setItem(USER_DATA, JSON.stringify({token: uToken}))
	}, [])

	// logout
	const logout = useCallback(() => {
		setToken(null)
		localStorage.removeItem(USER_DATA)
	}, [])

	// return data
	return {
		token,
		login,
		logout,
		isAuth: !!token
	}
}