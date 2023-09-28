import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/app.jsx';
import './main.css';
// import '../../reset.css';
import '../../reset2.css';
import { LocalStorageContextProvider } from '../providers/local_storage_provider.jsx';
import { ModalProvider } from '../providers/modal_provider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<LocalStorageContextProvider>
		<ModalProvider>
			<App />
		</ModalProvider>
	</LocalStorageContextProvider>
);
