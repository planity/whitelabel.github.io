import React, { useReducer } from 'react';
import classes from './configurator.module.css';

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

export const Configurator = ({ onSubmit }) => {
	const initialState = {
		businessId: '',
		environment: 'lab',
		countryCode: 'FR',
		refonte: false
	};
	const [{ businessId, environment, countryCode, refonte }, dispatch] =
		useReducer(reducer, initialState, x => x);
	const onClick = e => {
		e.preventDefault();
		onSubmit({ businessId, environment, countryCode, refonte });
	};
	console.log({ businessId, environment, countryCode, refonte });
	return (
		<fieldset className={classes.container}>
			<legend className={classes.title}>Configurator</legend>
			<form className={classes.form} onSubmit={onSubmit}>
				<label htmlFor={'env'}>
					<p>Environnement</p>
					<select
						onChange={e =>
							dispatch({
								type: 'ENVIRONMENT_HAS_CHANGED',
								payload: e.target.value
							})
						}
						name={'env'}
					>
						<option value={'lab'}>Lab</option>
						<option value={'staging'}>Staging</option>
						<option value={'production'}>Production</option>
					</select>
				</label>
				<label htmlFor={'businessId'}>
					<p>Business Id</p>
					<input
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

				<label htmlFor={'countryCode'}>
					<p>Country Code</p>
					<select
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
				<label htmlFor={'refonte'}>
					<p>Refonte</p>
					<input
						type={'checkbox'}
						onChange={e =>
							dispatch({
								type: 'REFONTE_HAS_CHANGED',
								payload: e.target.checked
							})
						}
						value={refonte}
						name={'refonte'}
					/>
				</label>

				<button onClick={onClick}>Go !</button>
			</form>
		</fieldset>
	);
};
