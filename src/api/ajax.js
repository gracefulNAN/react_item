
/* 二次封装请求 */

import axios from 'axios';
// 转换数据格式
import qs from 'qs';
// 警告显示
import {
  message
} from 'antd';
// 进度条  .start() 开始； .done() 结束
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 引入 store ，获取 state
import store from '../redux/store'
// 引入 history 对象，获取路由组建的功能
import history from '../history'
// 引入 removeUserToken ，删除 user 和 token
import {removeUserToken} from '../redux/action-creators/user'


// 创建一个 instance ，传入以个配置对象
const instance = axios.create({
  timeout: 10000,
});

// 请求拦截器, 传入一个回调函数, 回调传入请求配置对象，必须返回一个配置对象
instance.interceptors.request.use((config) => {
  // 显示请求进度
  NProgress.start()

  const { data } = config;
  if (data instanceof Object) { // 是对象就转
    config.data = qs.stringify(data);
  }

  // 如果有 token ，把 token 放入请求头中： Authorization
  // 获取 token
  const token = store.getState().user.token;
  if (token) {
    // 等价于：axios.defaults.headers.xxx
    config.headers.Authorization = 'atguigu_'+token;
  }

  return config;
});

// 拦截器, 传入两个回调函数，传入 response, error
instance.interceptors.response.use((response) => {
  // 隐藏请求进度
  NProgress.done()

  const result = response.data;

  return result;
}, (error) => {
  // 隐藏请求进度
  NProgress.done()

  // 统一处理请求异常
  // 获取 status 和 data.msg
  const {status, data: {msg} = {} } = error.response
  // 如果 status 是 401 ，token 有问题
  if (status === 401) {
    // 判断当前路由，是不是 login ，不是 就报错并删除内存数据，保证多次调用时，报一个错
    if (history.location.pathname !== '/login') {
      message.error(msg);
      // 删除用户信息，自动跳转到登录页面
      store.dispatch(removeUserToken());
    }
  }else if (status === 404) {
    message.error('请求资源不存在');
  } else {
    message.error('请求出错'+error.message);
  }

  // 第一代 代码
  /* // 显示警告
  message.error('请求错误'+error.message);
  // 中断 promise
  return new Promise(()=>{}); */
});

export default instance;