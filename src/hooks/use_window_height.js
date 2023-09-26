import { useSyncExternalStore } from 'react';

export const useWindowHeight = () => {
	const height = useSyncExternalStore(subscribe, getSnapshot);
	return { height };
};

function subscribe(callback) {
	window.addEventListener('resize', callback);
	return () => window.removeEventListener('resize', callback);
}

function getSnapshot() {
	return window.innerHeight;
}
