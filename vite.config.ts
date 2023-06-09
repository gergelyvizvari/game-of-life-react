
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation, { Shared } from "@originjs/vite-plugin-federation"

// https://vitejs.dev/config/
export default defineConfig({  
  plugins: [
    react(),
    federation({
      name: 'remote-app',
      filename: 'remoteEntry.js',
      // Modules to expose
      exposes: {
        './GameOfLife': './src/GameOfLife.tsx',
      },
      shared: { react:{ singleton: true }, "react-dom":{ singleton: true }, tailwindcss: {singleton: true} } as Shared,
    })
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})
