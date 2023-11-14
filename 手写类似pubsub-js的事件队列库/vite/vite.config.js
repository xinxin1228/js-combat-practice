import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 5200,
    open: true
  },
  plugins: [vue(), react()]
})
