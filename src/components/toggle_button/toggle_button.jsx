import classes from './toggle_button.module.css';
import React, { useState } from 'react';

export const ToggleButton = ({ enabled, onClick, className, children }) => {
	return (
		<div
			className={`${classes.toggleButton} ${
				enabled ? classes.enabled : classes.disabled
			} ${className || ''}`}
			onClick={() => onClick(!enabled)}
		>
			{children}
		</div>
	);
};
