import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './src/components/app/app.jsx';
import './main.css';
import './reset.css';
import { LocalStorageContextProvider } from './src/providers/local_storage_provider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<LocalStorageContextProvider>
			<App />
		</LocalStorageContextProvider>
	</React.StrictMode>
);
