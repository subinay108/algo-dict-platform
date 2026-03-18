import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import vitePluginReactMaterialSymbols from '@piyushpawar/vite-plugin-react-material-symbols';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePluginReactMaterialSymbols({
      variant: 'outlined', // Options: 'outlined' | 'rounded' | 'sharp'
      paths: ['src'],    // The directory to scan for icon usage
    }),
  ],
})
