import reactRefresh from '@vitejs/plugin-react-refresh';
import antdDayjs from 'antd-dayjs-vite-plugin';
import path from 'path';
import {
  defineConfig
} from 'vite';
import cesium from 'vite-plugin-cesium';
import svgr from 'vite-plugin-svgr';

import lessAntdModifyVars from '../src/theme/antd';

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'development',
  plugins: [
    reactRefresh(),
    cesium(),
    antdDayjs(),
    svgr(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: lessAntdModifyVars,
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: [{
        find: '@/',
        replacement: '/src/'
      },
      {
        find: /* ~/ */ /^~(?=\/)/,
        replacement: path.join(__dirname, 'node_modules')
      },
      {
        find: /* ~ */ /^~(?!\/)/,
        replacement: path.join(__dirname, 'node_modules/')
      },
    ],
  },
  server: {
    port: 8081,
    host: 'localhost',
    open: '/',
    proxy: {
      '/admin': {
        target: 'http://localhost',
        changeOrigin: true,
      },
      '/origin': {
        target: 'http://localhost',
        changeOrigin: true,
      },
    }
  },
});