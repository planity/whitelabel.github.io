import React, { useRef, useState } from 'react';
import classes from './landing.module.css';
import { useRect } from '../../hooks/use_rect.js';
import throttle from 'lodash.throttle';

const ALPHABET =
	'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const CHAR_WIDTH = 10; // Arbitrary and too high. But safe
const CHAR_HEIGHT = 10; // Arbitrary too

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
		regenerateRandomString(event);
	}

	function onMouseMove(event) {
		setPointerX(event.clientX - containerRect.x);
		setPointerY(event.clientY - containerRect.y);
		regenerateRandomString(event);
	}

	function regenerateRandomString(event) {
		const parentWidth = event.target.parentElement.clientWidth;
		const parentHeight = event.target.parentElement.clientHeight;

		const { totalFit } = computeChildrenNumberForParent(
			{
				parentWidth,
				parentHeight
			},
			{ childWidth: CHAR_WIDTH, childHeight: CHAR_HEIGHT }
		);
		setRandomString(throttledGenerateRandomString(totalFit));
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
					'--pointerX': `${pointerX}px`,
					'--pointerY': `${pointerY}px`
				}}
			>
				{randomString}
			</div>
		</div>
	);
};

/**
 * Generates a string from an `ALPHABET` constant.
 * @param size {number} the size of the string
 * @return {string} a random string composed by the const `ALPHABET`
 */
function generateRandomString(size = 10000) {
	return new Array(size)
		.fill(undefined)
		.map(() => ALPHABET.charAt(Math.random() * ALPHABET.length))
		.join('');
}

const throttledGenerateRandomString = throttle(generateRandomString, 60);

/**
 * Computes how many children can fit in parent. Used to fill a parent div.
 * @param parent {Object} the div you want to fill
 * @param parent.parentWidth {number} width of the parent div
 * @param parent.parentHeight {number} height of the parent div
 * @param child {Object} the children you want to fill the parent with
 * @param child.childWidth {number} width of the child div
 * @param child.childHeight {number} height of the child div
 * @return {{verticalFit: number, totalFit: number, horizontalFit: number}}
 */
function computeChildrenNumberForParent(
	{ parentWidth, parentHeight },
	{ childWidth, childHeight }
) {
	const horizontalFit = Math.floor(parentWidth / childWidth);
	const verticalFit = Math.floor(parentHeight / childHeight);

	const totalFit = horizontalFit * verticalFit;

	return {
		horizontalFit,
		verticalFit,
		totalFit
	};
}
