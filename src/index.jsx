/**
 * xjosiah-simple-react-admin 的全局入口文件，注册 react 和 redux 
 * 
 * @author smartmore-vimo
 * @version v0.1
 */

//  注册国际化
import '@/locales/config';
import './index.css';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { stroe } from './store';

ReactDom.render(
  //  redux-store 注入到 react 根组件实例之中
  <Provider store={stroe}>
    <App />
  </Provider>,
  //  react 和 html 中的 #id==='root' 的标签相连接
  document.getElementById('root'),
);
