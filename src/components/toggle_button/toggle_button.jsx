import classes from './toggle_button.module.css';
import React, { useState } from 'react';

export const ToggleButton = ({ enabled, onClick }) => {
	return (
		<div
			className={`${classes.resetButton} ${
				enabled ? classes.enabled : classes.disabled
			}`}
			onClick={() => onClick(!enabled)}
		>
			{enabled ? 'Refonte activée' : 'Refonte désactivée'}
		</div>
	);
};
