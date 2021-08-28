import { useState, useCallback } from 'react'

export const useHttp = () => {

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
		const _response = await response.json()
		const _status = response.status === 400 || response.status === 404
			? 'error'
			: 'success'
		;

		// push response status to state
		if (_response.status)
			sethttpStatus(_response.status
				.map((e, k) => <p key={k} className={`status_${_status}`}>{e}</p>)
			)

		// if server returns error -> break here
		if (_status === 'error') {
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
		return _response
	}, [])
	
	const clearHttpStatus = useCallback(() => sethttpStatus(null), []);

	return {httpLoading, httpRequest, httpStatus, clearHttpStatus}
}