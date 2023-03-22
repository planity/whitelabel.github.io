import classes from './reset_button.module.css';
import React from 'react';

export const ResetButton = ({ isCollapsed, onClick }) => {
	if (isCollapsed)
		return (
			<div
				className={classes.resetButton}
				onClick={() => {
					location.reload();
				}}
			>
				Réinitialiser la marque blanche
			</div>
		);
	return (
		<div
			className={classes.resetButton}
			onClick={() => onClick()}
			style={{
				top: -40
			}}
		/>
	);
};
