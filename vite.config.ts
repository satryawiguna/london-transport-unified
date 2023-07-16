import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 1982,
        https: {
            key: './tflwebsite-privateKey.key',
            cert: './tflwebsite.crt'
        }
    },
})
