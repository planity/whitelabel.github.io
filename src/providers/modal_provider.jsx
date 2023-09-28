import { createContext, useContext, useState } from 'react';
import { Overlay } from '../components/overlay/overlay.jsx';
import { ModalContainer } from '../components/modal_container/modal_container.jsx';

const ModalContext = createContext({});

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
	const [modal, setModal] = useState(null);

	const state = { setModal, modal };
	return (
		<ModalContext.Provider value={state}>
			{children}
			<Overlay isOpen={!!modal} onClick={() => setModal(null)} />
			<ModalContainer>{modal}</ModalContainer>
		</ModalContext.Provider>
	);
}
