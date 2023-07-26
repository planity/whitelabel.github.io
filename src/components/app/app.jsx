import React, { useEffect, useState } from 'react';
import { AwesomeGrid } from '../awesome_grid/awesome_grid.jsx';
import { Configurator } from '../configurator/configurator.jsx';
import classes from './app.module.css';
import { ResetButton } from '../reset_button/reset_button.jsx';
import { useLocalStorage } from '../../providers/local_storage_provider.jsx';
import { useWindowHeight } from '../../hooks/use_window_height.js';

const setWhiteLabel = ({ businessId, environment, countryCode, refonte }) => {
	window.planity = {
		key: businessId,
		options: {
			countryCode
		},
		container: document.getElementById('planity-container')
	};
	addScriptToDOM(
		`https://d2skjte8udjqxw.cloudfront.net/widget/${environment}${
			refonte ? '_refonte' : ''
		}/polyfills.latest.js`
	);
	addScriptToDOM(
		`https://d2skjte8udjqxw.cloudfront.net/widget/${environment}${
			refonte ? '_refonte' : ''
		}/app.latest.js`
	);
};

function addScriptToDOM(url) {
	const script = document.createElement('script');
	script.src = url;
	script.async = true;
	document.body.appendChild(script);
}

export const App = () => {
	const { businessId, environment, countryCode, refonte } = useLocalStorage();
	const onSubmit = () => {
		setTimeout(() => {
			location.reload();
		}, 500);
	};
	const { height } = useWindowHeight();

	useEffect(() => {
		if (!!businessId && !!environment && !!countryCode) {
			setWhiteLabel({ businessId, environment, countryCode, refonte });
		}
	}, [businessId, environment, countryCode, refonte]);

	return (
		<div className={classes.container} style={{ height }}>
			<AwesomeGrid />

			<div className='mainText'>
				<span>P</span>
				<span>L</span>
				<span>A</span>
				<span>N</span>
				<span>I</span>
				<span>T</span>
				<span>Y</span>
			</div>

			<ResetButton
				onClick={() => {
					localStorage.clear();
					location.reload();
				}}
			/>
			<div className={'content'}>
				<Configurator onSubmit={onSubmit} />
			</div>
			<div className={classes.wlContainer} id={'planity-container'} />
		</div>
	);
};
