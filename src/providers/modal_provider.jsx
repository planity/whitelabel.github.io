import { createContext, useContext, useState } from 'react';
import { Overlay } from '../components/overlay/overlay.jsx';
import { ModalContainer } from '../components/modal_container/modal_container.jsx';

const ModalContext = createContext({});

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
	const [modal, setModal] = useState(null);
	const [isOpen, setIsOpen] = useState(!!modal);

	const closeModal = () => {
		setIsOpen(false);
		setTimeout(() => setModal(null), 500);
	};
	const openModal = Modal => {
		setIsOpen(true);
		setModal(Modal);
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};
	const state = { openModal, isModalOpen: isOpen, closeModal };
	return (
		<ModalContext.Provider value={state}>
			{children}
			<Overlay isOpen={isOpen} onClick={closeModal} />
			<ModalContainer isOpen={isOpen}>{modal}</ModalContainer>
		</ModalContext.Provider>
	);
}
