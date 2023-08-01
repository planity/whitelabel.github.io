import React, { useEffect, useMemo } from 'react';
import { AwesomeGrid } from '../awesome_grid/awesome_grid.jsx';
import { Configurator } from '../configurator/configurator.jsx';
import classes from './app.module.css';
import { ResetButton } from '../reset_button/reset_button.jsx';
import { useLocalStorage } from '../../providers/local_storage_provider.jsx';
import { useWindowHeight } from '../../hooks/use_window_height.js';
import { MainText } from '../main_text/main_text.jsx';
import { MpaButtons } from '../mpa_buttons/mpa_buttons.jsx';

const setWhiteLabel = ({ businessId, environment, countryCode, refonte }) => {
	const { moduleType } = window;
	window.planity = {
		key: businessId,
		options: {
			countryCode
		},
		container: document.getElementById('planity-container'),
		accountContainer:
			moduleType === 'account' && document.getElementById('accountContainer'),
		appointmentContainer:
			moduleType === 'appointment' &&
			document.getElementById('appointmentContainer')
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
	const hasAWidgetSetUp = useMemo(
		() => !!businessId && !!environment && [false, true].includes(refonte),
		[businessId, environment, countryCode, refonte]
	);
	const onSubmit = () => {
		setTimeout(() => {
			location.reload();
		}, 500);
	};
	const { height } = useWindowHeight();

	useEffect(() => {
		if (hasAWidgetSetUp) {
			setWhiteLabel({ businessId, environment, countryCode, refonte });
		}
	}, [hasAWidgetSetUp, businessId, environment, countryCode, refonte]);
	return (
		<div className={classes.container} style={{ height }}>
			<AwesomeGrid />

			{hasAWidgetSetUp && <MainText />}

			<ResetButton
				onClick={() => {
					localStorage.clear();
					location.reload();
				}}
			/>
			<div className={classes.content}>
				<div className={classes.wlMainContainer}>
					<MpaButtons />

					<div className={classes.wlContainer} id={'planity-container'} />
					<div className={classes.wlContainer} id={'accountContainer'} />
					<div className={classes.wlContainer} id={'appointmentContainer'} />
				</div>
				<Configurator onSubmit={onSubmit} />
			</div>
		</div>
	);
};
