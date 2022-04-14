import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn'; //  antd日期中文有问题，引入
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import {store} from '../src/store';
import './index.less';
const history = createBrowserHistory();

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Router history={history}>
      <Provider store={store}>
      <App />
      </Provider>
    </Router>
  </ConfigProvider>,
  document.getElementById('root')
);
reportWebVitals();
