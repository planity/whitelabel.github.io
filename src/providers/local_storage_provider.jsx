import React, {
	createContext,
	useContext,
	useMemo,
	useSyncExternalStore
} from 'react';

const LocalStorageContext = createContext({});

export const useLocalStorage = () => useContext(LocalStorageContext);

export function LocalStorageContextProvider({ children }) {
	const businessId = useSyncExternalStore(subscribe, () =>
		localStorage.getItem('businessId')
	);
	const environment = useSyncExternalStore(subscribe, () =>
		localStorage.getItem('environment')
	);
	const countryCode = useSyncExternalStore(subscribe, () =>
		localStorage.getItem('countryCode')
	);
	const refonte = useSyncExternalStore(subscribe, () =>
		localStorage.getItem('refonte')
	);
	const state = {
		businessId,
		environment,
		countryCode,
		refonte
	};
	console.log('Local storage', state);
	return (
		<LocalStorageContext.Provider value={state}>
			{children}
		</LocalStorageContext.Provider>
	);
}

export const WithLocalStorage = LocalStorageContext.Consumer;
export const withLocalStorage = WrappedComponent => props =>
	(
		<WithLocalStorage>
			{contextProps => <WrappedComponent {...contextProps} {...props} />}
		</WithLocalStorage>
	);

const subscribe = listener => {
	window.addEventListener('storage', listener);
	return () => {
		window.removeEventListener('storage', listener);
	};
};
