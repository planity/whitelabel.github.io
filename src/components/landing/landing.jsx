import React, { useRef, useState } from 'react';
import classes from './landing.module.css';
import { useRect } from '../../hooks/use_rect.js';

const ALPHABET =
	'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function generateRandomString(size = 10000) {
	return new Array(size)
		.fill(undefined)
		.map(() => ALPHABET.charAt(Math.random() * ALPHABET.length))
		.join('');
}

export const Landing = () => {
	const [randomString, setRandomString] = useState(generateRandomString);

	const [pointerX, setPointerX] = useState(0);
	const [pointerY, setPointerY] = useState(0);
	const containerRef = useRef(null);
	const containerRect = useRect(containerRef);

	function onTouchMove(event) {
		const { clientX, clientY } = event.touches[0];
		setPointerX(clientX - containerRect.x);
		setPointerY(clientY - containerRect.y);
		regenerateRandomString();
	}
	function onMouseMove(event) {
		setPointerX(event.clientX - containerRect.x);
		setPointerY(event.clientY - containerRect.y);
		regenerateRandomString();
	}
	function regenerateRandomString() {
		setRandomString(generateRandomString());
	}

	return (
		<div
			className={classes.landing}
			onTouchMove={onTouchMove}
			onMouseMove={onMouseMove}
		>
			<div className={classes.gradientContainer} />
			<div
				ref={containerRef}
				className={classes.stringContainer}
				style={{
					maskImage: `radial-gradient(calc(280px * 0.8) circle at ${pointerX}px ${pointerY}px,rgb(255 255 255) 50%, rgb(255 255 255 / 25%),transparent)`
				}}
			>
				{randomString}
			</div>
		</div>
	);
};
