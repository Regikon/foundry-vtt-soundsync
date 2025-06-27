import type { UserConfig } from 'vite';

const config: UserConfig = {
    publicDir: 'public',
    base: '/modules/foundry-vtt-soundsync',
    server: {
        port: 30001,
        open: true,
        proxy: {
            '^(?!/modules/foundry-vtt-soundsync)': 'http://localhost:30000/',
            '/socket.io': {
                target: 'ws://localhost:30000',
                ws: true,
            },
        },
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: true,
        lib: {
            name: 'foundry-vtt-soundsync',
            entry: 'src/main.ts',
            formats: ['es'],
            fileName: 'soundsync',
        }
    },
}

export default config;
