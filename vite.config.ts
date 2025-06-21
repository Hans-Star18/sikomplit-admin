import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
    plugins: [
        TanStackRouterVite({
            target: 'react',
            autoCodeSplitting: true,
            routesDirectory: './src/routes',
            generatedRouteTree: './src/routeTree.gen.ts',
        }),
        react(),
        tailwindcss(),
        mkcert(),
    ],
    server: {
        port: 3000,
        host: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),

            // fix loading all icon chunks in dev mode
            // https://github.com/tabler/tabler-icons/issues/1233
            '@tabler/icons-react':
                '@tabler/icons-react/dist/esm/icons/index.mjs',
        },
    },
});
