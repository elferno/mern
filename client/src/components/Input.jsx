import React from 'react'
import css from '../styles/Input.module.css'

export const Input = ({
	id,
	type,
	value,
	focus,
	handler,
	placeholder
}) => {
	return (
		<div className={css.input}>
			<input
				type={type}
				id={id}
				name={id}
				value={value}
				autoComplete="off"
				onFocus={focus}
				onChange={handler}
				placeholder={placeholder}
			/>
			<i></i>
		</div>
	)
}