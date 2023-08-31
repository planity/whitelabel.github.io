import React, { useReducer } from 'react';
import classes from './configurator.module.css';
import { useLocalStorage } from '../../providers/local_storage_provider.jsx';
import { ToggleButton } from '../toggle_button/toggle_button.jsx';
import { Coin } from './coin.jsx';
import businesses from './businesses.json';

function reducer(state, action) {
	switch (action.type) {
		case 'BUSINESS_ID_HAS_CHANGED':
			return { ...state, businessId: action.payload };
		case 'ENVIRONMENT_HAS_CHANGED':
			return { ...state, environment: action.payload };
		case 'COUNTRY_CODE_HAS_CHANGED':
			return { ...state, countryCode: action.payload };
		case 'REFONTE_HAS_CHANGED':
			return { ...state, refonte: action.payload };
		default:
			console.error('unhandled action', action);
	}
}

function initialState({ businessId, environment, countryCode, refonte }) {
	return {
		businessId: businessId || '',
		environment: environment || 'lab',
		refonte: [true, false].includes(refonte) ? !!refonte : true
	};
}

export const Configurator = ({ onSubmit }) => {
	const localStorageInitialState = useLocalStorage();
	const [{ businessId, environment, countryCode, refonte }, dispatch] =
		useReducer(reducer, localStorageInitialState, initialState);
	const onClick = e => {
		e.preventDefault();
		localStorage.setItem('businessId', businessId);
		localStorage.setItem('environment', environment);
		localStorage.setItem('refonte', JSON.stringify(!!refonte));
		onSubmit();
	};

	return (
		<fieldset className={classes.container}>
			<legend className={classes.title}>Configurator</legend>
			<form className={classes.form} onSubmit={onSubmit}>
				<label className={classes.label} htmlFor={'environment'}>
					<select
						className={classes.input}
						onChange={e =>
							dispatch({
								type: 'ENVIRONMENT_HAS_CHANGED',
								payload: e.target.value
							})
						}
						name={'environment'}
					>
						<option value={''} disabled>
							Environnement
						</option>
						<option value={'lab'}>Lab</option>
						<option value={'staging'}>Staging</option>
						<option value={'production'}>Production</option>
					</select>
				</label>
				<label className={classes.label} htmlFor={'businessId'}>
					<input
						className={`${classes.input} ${classes.textInput}`}
						type='text'
						name='businessId'
						list='businessIds'
						value={businessId}
						onChange={e =>
							dispatch({
								type: 'BUSINESS_ID_HAS_CHANGED',
								payload: e.currentTarget.value
							})
						}
						placeholder={'Business Id'}
					/>
					<datalist id='businessIds'>
						{businesses.map(({ objectID, name }) => (
							<option value={objectID} label={name} key={objectID}>
								{name}
							</option>
						))}
					</datalist>
				</label>
				<label className={classes.label} htmlFor={'refonte'}>
					<ToggleButton
						enabled={!!refonte}
						onClick={enabled =>
							dispatch({
								type: 'REFONTE_HAS_CHANGED',
								payload: enabled
							})
						}
					/>
				</label>

				<button className={classes.submitButton} onClick={onClick}>
					START
					<div className={classes.rotatingIcon}>
						<Coin />
					</div>
				</button>
			</form>
		</fieldset>
	);
};
