import React, { useEffect, useMemo } from 'react';
import { AwesomeGrid } from '../awesome_grid/awesome_grid.jsx';
import classes from './app.module.css';
import { useLocalStorage } from '../../providers/local_storage_provider.jsx';
import { MainText } from '../main_text/main_text.jsx';
import { NavButtons } from '../nav_buttons/nav_buttons.jsx';
import { Landing } from '../landing/landing.jsx';
import { ToggleButton } from '../toggle_button/toggle_button.jsx';
import { useModal } from '../../providers/modal_provider.jsx';
import { Configurator } from '../configurator/configurator.jsx';

const setWhiteLabel = ({ businessId, environment, refonte }) => {
	// Pretty sensitive actually 😕
	const moduleType = window.location.pathname.replace(/(\/|.html|multi_)/g, '');
	window.planity = {
		key: businessId,
		options: {},
		container: document.getElementById('planity-container'),
		accountContainer:
			moduleType === 'account' && document.getElementById('accountContainer'),
		appointmentContainer:
			moduleType === 'appointment' &&
			document.getElementById('appointmentContainer'),
		onlineShopContainer:
			moduleType === 'online_shop' &&
			document.getElementById('onlineShopContainer'),
		giftVoucherContainer:
			moduleType === 'gift_vouchers' &&
			document.getElementById('giftVoucherContainer')
	};
	addScriptToDOM(
		`https://d2skjte8udjqxw.cloudfront.net/widget/${environment}${
			refonte ? '/2' : ''
		}/polyfills.latest.js`
	);
	addScriptToDOM(
		`https://d2skjte8udjqxw.cloudfront.net/widget/${environment}${
			refonte ? '/2' : ''
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
	const { businessId, environment, refonte } = useLocalStorage();
	const { openModal, isOpen } = useModal();
	const hasAWidgetSetUp = useMemo(
		() => !!businessId && !!environment && [false, true].includes(refonte),
		[businessId, environment, refonte]
	);

	useEffect(() => {
		if (hasAWidgetSetUp) {
			setWhiteLabel({ businessId, environment, refonte });
		}
	}, [hasAWidgetSetUp, businessId, environment, refonte]);
	return (
		<div className={classes.container}>
			<AwesomeGrid />

			<MainText />

			<div className={classes.content}>
				{hasAWidgetSetUp ? (
					<div className={classes.wlMainContainer}>
						<NavButtons isMPA={window.isMPA} />

						<div className={classes.wlContainer} id={'planity-container'} />
						<div className={classes.wlContainer} id={'accountContainer'} />
						<div className={classes.wlContainer} id={'appointmentContainer'} />
						<div className={classes.wlContainer} id={'giftVoucherContainer'} />
						<div className={classes.wlContainer} id={'onlineShopContainer'} />
					</div>
				) : (
					<Landing />
				)}
			</div>
			<ToggleButton
				onClick={() => openModal(<Configurator />)}
				enabled={!isOpen}
				className={classes.configuratorButton}
			>
				CONFIGURATOR
			</ToggleButton>
		</div>
	);
};
