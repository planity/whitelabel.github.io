import { useSyncExternalStore } from 'react';

export const useWindowWidth = () => {
	const width = useSyncExternalStore(subscribe, getSnapshot);
	return { width };
};

function subscribe(callback) {
	window.addEventListener('resize', callback);
	return () => window.removeEventListener('resize', callback);
}

function getSnapshot() {
	return window.innerWidth;
}
