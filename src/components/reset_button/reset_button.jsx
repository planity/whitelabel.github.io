import classes from './reset_button.module.css';
import React from 'react';

export const ResetButton = ({ onClick }) => {
	return (
		<div
			className={classes.resetButton}
			onClick={() => {
				onClick();
			}}
		>
			Réinitialiser la marque blanche
		</div>
	);
};
