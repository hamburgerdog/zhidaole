/**
 * xjosiah-simple-react-admin 的全局入口文件，注册 react 和 redux
 *
 * @author xjosiah
 * @version v0.1
 */

//  注册国际化
import '@/locales/config';
import './index.css';

import React from 'react';
import ReactDom from 'react-dom';
import { RecoilRoot } from 'recoil';

import App from './App';

ReactDom.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById('root'),
);
