import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mpaPlugin from 'vite-plugin-mpa-plus';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
	plugins: [
		react(),
		mpaPlugin({
			pages: {
				multi_account: {
					entry: './src/components/main.jsx',
					filename: 'multi_account.html',
					template: '/src/pages/multi_page_template.html'
				},
				multi_appointment: {
					entry: './src/components/main.jsx',
					filename: 'multi_appointment.html',
					template: '/src/pages/multi_page_template.html'
				},
				multi_gift_vouchers: {
					entry: './src/components/main.jsx',
					filename: 'multi_gift_vouchers.html',
					template: '/src/pages/multi_page_template.html'
				},
				multi_online_shop: {
					entry: './src/components/main.jsx',
					filename: 'multi_online_shop.html',
					template: '/src/pages/multi_page_template.html'
				},
				index: {
					entry: './src/components/main.jsx',
					filename: 'index.html',
					template: '/src/pages/single_page_template.html'
				}
			}
		})
	],
	build: { emptyOutDir: true }
});
