import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    plugins: [
        solidPlugin(),
        viteStaticCopy({
            targets: [{ src: 'public', dest: '' }],
        }),
    ],

    build: {
        target: 'esnext',
        outDir: 'dist',
    },

    server: {
        host: true,
        port: 3000,
    },
})
