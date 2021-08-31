import { useState, useCallback } from 'react'

export const useHttp = (logout = false) => {

	const [httpLoading, setHttpLoading] = useState(false)
	const [httpStatus, sethttpStatus] = useState()

	const httpRequest = useCallback(async (
		url,
		method = 'GET',
		body = null,
		headers = {},
		callback = false
	) => {
		// set loading TRUE
		setHttpLoading(true)

		// handle request with body
		if (body) {
			headers['Content-Type'] = 'application/json'
			body = JSON.stringify(body)
		}

		// make request
		const response = await fetch(url, {
			method,
			headers,
			body
		})

		// get server response data
		const serverResponse = await response.json()
		const serverStatus = response.status > 399
			? 'error'
			: 'success'
		;

		// possible logout
		if (logout && response.status === 401)
			return logout()

		// push response status to state
		if (serverResponse.status)
			sethttpStatus(serverResponse.status
				.map((e, k) => <p key={k} className={`status_${serverStatus}`}>{e}</p>)
			)

		// if server returns error -> break here
		if (serverStatus === 'error') {
			setHttpLoading(false)
			return false
		}

		// if callback
		if (callback) {
			callback()
			return false
		}

		// if OK return response
		setHttpLoading(false)
		return serverResponse
	}, [logout])
	
	const clearHttpStatus = useCallback(() => sethttpStatus(null), []);

	return {httpLoading, httpRequest, httpStatus, clearHttpStatus}
}