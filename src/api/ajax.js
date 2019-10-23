
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


// 创建一个 instance ，传入以个配置对象
const instance = axios.create({
  timeout: 10000,
});

// 请求拦截器, 传入一个回调函数, 回调传入请求配置对象，必须返回一个配置对象
instance.interceptors.request.use((config) => {
  // 显示请求进度
  NProgress.start()

  const {
    data
  } = config;
  if (data instanceof Object) { // 是对象就转
    config.data = qs.stringify(data);
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
  // 显示警告
  message.error('请求错误'+error.message);
  // 中断 promise
  return new Promise(()=>{});
});

export default instance;