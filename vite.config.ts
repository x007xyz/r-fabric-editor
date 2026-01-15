import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/', // 修改为根路径，适用于服务器根目录部署
  plugins: [
    react(),
  ],
  resolve: {
    alias: [
      { find: /^@\//, replacement: path.resolve(__dirname, 'src') + '/' },
      { find: /^~/, replacement: '' },
      { find: /^vue-i18n/, replacement: 'vue-i18n/dist/vue-i18n.cjs.js' },
    ],
    extensions: ['.ts', '.tsx', '.js', '.mjs', '.vue', '.json', '.less', '.css'],
  },
}))
