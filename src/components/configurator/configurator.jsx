import React, { useReducer } from 'react';
import classes from './configurator.module.css';
import { useLocalStorage } from '../../providers/local_storage_provider.jsx';

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
		countryCode: countryCode || 'FR',
		refonte: !!refonte || false
	};
}

export const Configurator = ({ onSubmit }) => {
	const localStorageInitialState = useLocalStorage();
	const [{ businessId, environment, countryCode, refonte }, dispatch] =
		useReducer(reducer, localStorageInitialState, initialState);
	console.log('reducer', { businessId, environment, countryCode, refonte });
	const onClick = e => {
		e.preventDefault();
		localStorage.setItem('businessId', businessId);
		localStorage.setItem('environment', environment);
		localStorage.setItem('countryCode', countryCode);
		refonte
			? localStorage.setItem('refonte', refonte)
			: localStorage.removeItem('refonte');
		const _businessId = localStorage.getItem('businessId') || '';
		const _environment = localStorage.getItem('environment') || 'lab';
		const _countryCode = localStorage.getItem('countryCode') || 'FR';
		const _refonte = !!localStorage.getItem('refonte') || false;
		console.log({ _businessId, _environment, _countryCode, _refonte });
		onSubmit();
	};

	return (
		<fieldset className={classes.container}>
			<legend className={classes.title}>Configurator</legend>
			<form className={classes.form} onSubmit={onSubmit}>
				<label className={classes.label} htmlFor={'environment'}>
					<p>Environnement</p>
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
						<option value={'lab'}>Lab</option>
						<option value={'staging'}>Staging</option>
						<option value={'production'}>Production</option>
					</select>
				</label>
				<label className={classes.label} htmlFor={'businessId'}>
					<p>Business Id</p>
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
					/>
					<datalist id='businessIds'>
						<option value={'saco'} label={'Saco'}>
							Saco
						</option>
						<option value='-LqHElRfcHDuDZllMFy6'>A l'arrache</option>
					</datalist>
				</label>

				<label className={classes.label} htmlFor={'countryCode'}>
					<p>Country Code</p>
					<select
						className={classes.input}
						onChange={e =>
							dispatch({
								type: 'COUNTRY_CODE_HAS_CHANGED',
								payload: e.target.value
							})
						}
						value={countryCode}
						name={'countryCode'}
					>
						<option value={'FR'}>France</option>
						<option value={'BE'}>Belgique</option>
						<option value={'DE'}>Allemagne</option>
					</select>
				</label>
				<label className={classes.label} htmlFor={'refonte'}>
					<p>Refonte</p>
					<input
						className={classes.input}
						type={'checkbox'}
						onChange={e =>
							dispatch({
								type: 'REFONTE_HAS_CHANGED',
								payload: e.target.checked
							})
						}
						checked={refonte}
						name={'refonte'}
					/>
				</label>

				<button className={classes.submitButton} onClick={onClick}>
					Go !
				</button>
			</form>
		</fieldset>
	);
};
