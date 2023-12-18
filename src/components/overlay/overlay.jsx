import React from 'react';
import classes from './overlay.module.css';

export const Overlay = ({ isOpen, onClick }) => {
	return (
		<div
			onClick={onClick}
			className={`${classes.overlay} ${isOpen ? classes.openOverlay : ''}`}
		/>
	);
};
