import { defineConfig } from 'vite';
const path = require('path');
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@scripts': path.resolve(__dirname, './assets/javascript'),
      '@img': path.resolve(__dirname, './assets/img'),
      '@parts': path.resolve(__dirname, './assets/sass/partials'),
      '@styles': path.resolve(__dirname, './assets/sass'),
      '@': path.resolve(__dirname, './'),
      '~': path.resolve(__dirname, './')
    }
  }
});