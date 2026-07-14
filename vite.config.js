import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
  }

  if (command === 'serve') {
    config.server = {
      proxy: {
        '/api': 'http://localhost:3000/api/check',
      },
    }
  }

  return config
})
