import React, { createContext, useContext, useSyncExternalStore } from 'react';

const LocalStorageContext = createContext({});

export const useLocalStorage = () => useContext(LocalStorageContext);

export function LocalStorageContextProvider({ children }) {
	const businessId = useSyncExternalStore(subscribe, () =>
		localStorage.getItem('businessId')
	);
	const environment = useSyncExternalStore(subscribe, () =>
		localStorage.getItem('environment')
	);
	const refonte = useSyncExternalStore(subscribe, () =>
		JSON.parse(localStorage.getItem('refonte'))
	);

	const isMPA = useSyncExternalStore(subscribe, () =>
		JSON.parse(localStorage.getItem('isMPA'))
	);
	const state = {
		businessId,
		environment,
		refonte,
		isMPA
	};
	return (
		<LocalStorageContext.Provider value={state}>
			{children}
		</LocalStorageContext.Provider>
	);
}
const subscribe = listener => {
	window.addEventListener('storage', listener);
	return () => {
		window.removeEventListener('storage', listener);
	};
};
