// 发请求用的
import axios from 'axios';
// 用于把对象数据转换为 urlencode 格式数据
import qs from 'qs';
// 显示失败信息
import {
  message
} from 'antd';
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建一个 instance ,指定一些属性
const instance = axios.create({
  timeout: 10000 // 超时时间
});

// 请求拦截器, 传一个回调函数，参数 config配置对象,必须返回config 配置对象
/* 
config{
  url,
  method,
  data:{username,password}
}
*/
instance.interceptors.request.use((config) => {
  // 显示进度条
  NProgress.start();

  /* 
  将 post/put 请求的 data 对象数据转换为 urlencode 格式的字符串数据
  因为有的服务端可能不支持 JSON 格式的数据，要进行数据转换
  */
  const {
    data
  } = config
  if (data instanceof Object) { // 是对象就转换
    config.data = JSON.stringify(data)
  }

  return config;
});

// 响应拦截器
/* 
接收两个回调函数参数,响应数据，请求异常
*/
instance.interceptors.response.use((response) => {
    // 隐藏请求进度
    NProgress.done()
    // 返回响应的数据
    const result = response.data;
    return result
  },
  (error) => {
    // 隐藏请求进度
    NProgress.done();
    // 显示错误信息
    message.error('请求出错',error.message);
    // 返回一个状态为 pending 的 promise 中断错误传透
    return new Promise(()=>{});
  }
);

// 向外暴露 instance
export default instance;