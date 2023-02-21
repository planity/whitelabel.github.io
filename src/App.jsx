import React, { useEffect, useState } from 'react';
import { AwesomeGrid } from './awesome_grid/awesome_grid.jsx';

function addScriptToDOM(url) {
	const script = document.createElement('script');
	script.src = url;
	script.async = true;
	document.body.appendChild(script);
	return () => document.body.removeChild(script);
}

export const App = () => {
	const [wl, setWl] = useState(null);
	useEffect(() => {
		if (wl) {
			window.planity = {
				key: wl
			};

			const destroyPolyfill = addScriptToDOM(
				'https://d2skjte8udjqxw.cloudfront.net/widget/lab/polyfills.latest.js'
			);
			const destroyApp = addScriptToDOM(
				'https://d2skjte8udjqxw.cloudfront.net/widget/lab/app.latest.js'
			);
			return () => {
				destroyPolyfill();
				destroyApp();
			};
		}
	}, [wl]);
	return (
		<div>
			<div className='backgroundContainer'>
				<AwesomeGrid />
			</div>

			<div className='mainText'>
				<span>P</span>
				<span>L</span>
				<span>A</span>
				<span>N</span>
				<span>I</span>
				<span>T</span>
				<span>Y</span>
			</div>

			<div className={'content'}>
				<button onClick={() => setWl('stagingsaco')}>Click</button>
			</div>
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

const styles = {};
