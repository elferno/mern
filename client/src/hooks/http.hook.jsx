import { useState, useCallback } from 'react'

export const useHttp = () => {

	const [httpLoading, setHttpLoading] = useState(false)
	const [httpError, setHttpError] = useState()

	const httpRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
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

		// set loading FALSE
		setHttpLoading(false)

		// if server returns error
		if (response.status !== 200 && response.status !== 201) {
			setHttpError((await response.json()).error.map((e, k) => <p key={k}>{e}</p>))
			return false
		}

		// return response
		return response.json()
	}, [])

	const clearHttpError = () => setHttpError(null)

	return {httpLoading, httpRequest, httpError, clearHttpError}
}