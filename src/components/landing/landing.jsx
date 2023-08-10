import React, { useState } from 'react';
import classes from './landing.module.css';
import { ResetButton } from '../reset_button/reset_button.jsx';
import { ToggleButton } from '../toggle_button/toggle_button.jsx';

export const Landing = () => {
	const [isEnabled, setIsEnabled] = useState(true);
	return (
		<div className={classes.landing}>
			<ToggleButton onClick={() => setIsEnabled(a => !a)} enabled={isEnabled} />
		</div>
	);
};
