import React from 'react';
import classes from './nav_buttons.module.css';

export const NavButtons = ({ isMPA }) => {
	return (
		<div className={classes.navButtonContainer}>
			{isMPA ? (
				<>
					<a className={classes.mainLink} href={'./'}>
						Activer mode "Single Page" 🚀
					</a>
					<a className={classes.links} href={'./multi_appointment.html'}>
						Prendre RDV
					</a>
					<a className={classes.links} href={'./multi_gift_vouchers.html'}>
						Cartes cadeaux
					</a>
					<a className={classes.links} href={'./multi_online_shop.html'}>
						Boutique en ligne
					</a>
					<a className={classes.links} href={'./multi_account.html'}>
						Mon compte
					</a>
				</>
			) : (
				<a className={classes.mainLink} href={'./multi_appointment.html'}>
					Activer mode "Multi Page" 🚀
				</a>
			)}
		</div>
	);
};
