import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				multi_account: resolve(__dirname, 'multi_account.html'),
				lol2: resolve(__dirname, 'pages', 'lol.html'),
				index: resolve(__dirname, 'pages/index.html')
			}
		}
	}
});
