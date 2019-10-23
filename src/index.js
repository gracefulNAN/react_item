/* 
入口 js
*/

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'

import store from './redux/store'
import App from './App';

// Provider在根组件外面包了一层，这样一来，App的所有子组件就默认都可以拿到state, 与 connect 高级函数搭配使用，可以使子组件通过 this.props.state 获取 state 数据
ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>
),document.getElementById('root'));


/* 
react-redux：
https://www.jianshu.com/p/81e9e9eaf8fa

*/