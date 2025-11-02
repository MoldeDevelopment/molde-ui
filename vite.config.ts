import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'molde-ui',
      formats: ['es', 'cjs'],
      fileName: format => `index.${format === 'es' ? 'esm.js' : 'js'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
        assetFileNames: assetInfo => {
          if (assetInfo.name === 'molde-ui.css' || assetInfo.name === 'style.css') {
            return 'styles.css';
          }
          return assetInfo.name || 'asset';
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    copyPublicDir: false,
  },
});
