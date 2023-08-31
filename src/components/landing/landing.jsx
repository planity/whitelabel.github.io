import React from 'react';
import classes from './landing.module.css';

export const Landing = () => {
	return (
		<div className={classes.landing}>
			<img
				className={classes.image}
				src={'../../../assets/91s.jpg'}
				alt={'91s'}
			/>
		</div>
	);
};
