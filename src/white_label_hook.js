import { useCallback } from 'react';

export const useWhiteLabel = () => {
	const setWhiteLabel = useCallback(
		({ businessId, environment, countryCode, refonte }) => {
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
		},
		[]
	);

	return {
		setWhiteLabel
	};
};

function addScriptToDOM(url) {
	const script = document.createElement('script');
	script.src = url;
	script.async = true;
	document.body.appendChild(script);
}
