import React from 'react';
import classes from './modal_container.module.css';

export const ModalContainer = ({ isOpen, children }) => {
	return (
		<div
			className={`${classes.modalContainer} ${
				isOpen ? classes.opened : classes.closed
			}`}
		>
			{children}
		</div>
	);
};
