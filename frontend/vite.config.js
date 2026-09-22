import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true,
        watch: {
            usePolling: true,
        },
        proxy: {
            '/api': {
                target: 'http://localhost:3005',
                changeOrigin: true,
            },
            // Adicione isso se quiser que /auth também seja proxyado
            '/auth': {
                target: 'http://localhost:3005',
                changeOrigin: true,
            },
        },
    },
});
