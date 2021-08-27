import React from 'react'
import css from '../styles/Button.module.css'

export const Button = ({
	type,
	click,
	disabled,
	children
}) => {
	return (
		<div 
			className={`${css.button} ${css[`button_${type}`]}`}
			onClick={click}
			disabled={disabled}
		>
			<b>{children}</b>
			<i></i>
		</div>
	)
}