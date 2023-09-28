import React from 'react';
import classes from './modal_container.module.css';

export const ModalContainer = ({ children }) => {
	return (
		<div className={classes.modalContainer}>
			<div className={classes.modalContent}>{children}</div>
		</div>
	);
};
