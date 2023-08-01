import { useSyncExternalStore } from 'react';

export const useWindowHeight = () => {
	// const height = useSyncExternalStore(subscribe, getSnapshot);
	return { height: 1000 };
};

function subscribe(callback) {
	const observer = new MutationObserver(callback);
	const observerConfig = {
		attributes: true, // Observe les changements d'attributs (y compris la taille)
		childList: true, // Observe les changements dans les enfants du nœud cible (body)
		subtree: true // Observe les changements dans tous les descendants du nœud cible
	};

	observer.observe(document.body, observerConfig);
	return () => {
		observer.disconnect();
	};
}

function getSnapshot() {
	return document.body.scrollHeight;
}
