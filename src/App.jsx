import React, { useState } from 'react';
import { AwesomeGrid } from './awesome_grid/awesome_grid.jsx';
import { Configurator } from './configurator/configurator.jsx';
import { useWhiteLabel } from './white_label_hook.js';
import classes from './app.module.css';
import { ResetButton } from './reset_button.jsx';

export const App = () => {
	const { setWhiteLabel } = useWhiteLabel();
	const onSubmit = ({ businessId, environment, countryCode, refonte }) => {
		setWhiteLabel({ businessId, environment, countryCode, refonte });
		setIsCollapsed(true);
	};
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div className={classes.container}>
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
				isCollapsed={isCollapsed}
				onClick={() => setIsCollapsed(false)}
			/>
			<div
				className={'content'}
				style={{
					transform: isCollapsed ? 'translateY(-100vh)' : 'translateY(0)'
				}}
			>
				<Configurator onSubmit={onSubmit} />
			</div>
			<div
				style={{
					transform: !isCollapsed ? 'translateY(100vh)' : 'translateY(0)'
				}}
				className={classes.wlContainer}
				id={'planity-container'}
			/>
			{/*<div className="container">*/}
			{/*    <fieldset className="sub-container">*/}
			{/*        <legend className="language-text">français</legend>*/}
			{/*        <a className="links" href="lab/fr.html">Lab</a>*/}
			{/*        <a className="links" href="lab/fr_refonte.html">Lab <span>NEW</span></a>*/}
			{/*        <a className="links" href="lab/multipage_fr/index.html">Multi Page</a>*/}
			{/*        <a className="links" href="lab/multipage_refonte_fr/index.html">Multi Page <span>NEW</span></a>*/}
			{/*        <a className="links" href="staging/fr.html">Staging</a>*/}
			{/*        <a className="links" href="production/fr.html">Production</a>*/}
			{/*    </fieldset>*/}
			{/*    <fieldset className="sub-container">*/}
			{/*        <legend className="language-text">Deutsch</legend>*/}
			{/*        <a className="links" href="lab/de.html">Lab</a>*/}
			{/*        <a className="links" href="lab/de_refonte.html">Lab <span>NEW</span></a>*/}
			{/*        <a className="links" href="lab/multipage_de/index.html">Multi Page</a>*/}
			{/*        <a className="links" href="lab/multipage_refonte_de/index.html">Multi Page <span>NEW</span></a>*/}
			{/*        <a className="links" href="staging/de.html">Staging</a>*/}
			{/*        <a className="links" href="production/de.html">Production</a>*/}
			{/*    </fieldset>*/}
			{/*</div>*/}
		</div>
	);
};
