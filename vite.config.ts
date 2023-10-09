import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@\//, replacement: path.resolve(__dirname, 'src') + '/' },
      { find: /^~/, replacement: '' },
      { find: /^vue-i18n/, replacement: 'vue-i18n/dist/vue-i18n.cjs.js' },
    ],
    extensions: ['.ts', '.tsx', '.js', '.mjs', '.vue', '.json', '.less', '.css'],
  },
})
