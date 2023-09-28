import React, { useReducer } from 'react';
import classes from './configurator.module.css';
import { useLocalStorage } from '../../providers/local_storage_provider.jsx';
import { ToggleButton } from '../toggle_button/toggle_button.jsx';
import { Coin } from './coin.jsx';
import businesses from './businesses.json';
import { Reset } from './reset.jsx';

function reducer(state, action) {
	switch (action.type) {
		case 'BUSINESS_ID_HAS_CHANGED':
			return { ...state, businessId: action.payload };
		case 'ENVIRONMENT_HAS_CHANGED':
			return { ...state, environment: action.payload };
		case 'REFONTE_HAS_CHANGED':
			return { ...state, refonte: action.payload };
		default:
			console.error('unhandled action', action);
	}
}

function initialState({ businessId, environment, refonte }) {
	return {
		businessId: businessId || '',
		environment: environment || 'lab',
		refonte: [true, false].includes(refonte) ? !!refonte : true
	};
}

export const Configurator = ({ onSubmit }) => {
	const localStorageInitialState = useLocalStorage();
	const [{ businessId, environment, refonte }, dispatch] = useReducer(
		reducer,
		localStorageInitialState,
		initialState
	);

	const submit = e => {
		e?.preventDefault();
		localStorage.setItem('businessId', businessId);
		localStorage.setItem('environment', environment);
		localStorage.setItem('refonte', JSON.stringify(!!refonte));
		setTimeout(() => {
			location.reload();
		}, 500);

		if (typeof onSubmit === 'function') onSubmit();
	};
	async function reset(e) {
		e?.preventDefault();
		localStorage.clear();
		location.reload();
	}

	return (
		<fieldset className={classes.container}>
			<legend className={classes.title}>Configurator</legend>
			<form className={classes.form} onSubmit={submit}>
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
						className={classes.input}
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
					>
						{!!refonte ? 'Refonte activée' : 'Refonte désactivée'}
					</ToggleButton>
				</label>
				<div className={classes.buttons}>
					<button className={classes.resetButton} onClick={reset}>
						<Reset color={'white'} size={16} />
						RESET
					</button>
					<button className={classes.submitButton} onClick={submit}>
						START
						<div className={classes.rotatingIcon}>
							<Coin />
						</div>
					</button>
				</div>
			</form>
		</fieldset>
	);
};
