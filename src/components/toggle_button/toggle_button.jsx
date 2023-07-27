import classes from './toggle_button.module.css';
import React, { useState } from 'react';

export const ToggleButton = ({ onClick }) => {
	const [enabled, setEnabled] = useState(false);
	return (
		<div
			className={`${classes.resetButton} ${
				enabled ? classes.enabled : classes.disabled
			}`}
			onClick={() => {
				setEnabled(x => !x);
				onClick();
			}}
		>
			{enabled ? 'Activé' : 'Désactivé'}
		</div>
	);
};
