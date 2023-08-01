import React from 'react';
import classes from './mpa_buttons.module.css';

export const MpaButtons = () => {
	return (
		<div className={classes.mpaButtonContainer}>
			<a className={classes.links} href={'./multi_account.html'}>
				Mon compte
			</a>
			<a className={classes.links} href={'./multi_appointment.html'}>
				RDV
			</a>
		</div>
	);
};
