import { useState, useCallback } from 'react'

const USER_DATA = 'userData'

export const useAuth = () => {
	// user data
	const userData = JSON.parse(
		localStorage.getItem(USER_DATA)
		|| '{"token":null, "userID":null}'
	)

	// local state
	const [token, setToken] = useState(userData.token)
	const [userID, setUserID] = useState(userData.userID)

	// login
	const login = useCallback((_token, _userID) => {
		setToken(_token)
		setUserID(_userID)

		localStorage.setItem(USER_DATA, JSON.stringify({
			token: _token,
			userID: _userID
		}))
	}, [])

	// logout
	const logout = useCallback(() => {
		setToken(null)
		setUserID(null)
		
		localStorage.removeItem(USER_DATA)
	}, [])

	// return data
	return {
		token,
		userID,
		login,
		logout,
		isAuth: !!token
	}
}