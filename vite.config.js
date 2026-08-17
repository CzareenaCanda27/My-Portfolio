import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/My-Portfolio/' : '/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 600
  },
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.js']
  }
}));
