// 发请求用的
import axios from 'axios';
// 用于把对象数据转换为query格式数据
import qs from 'qs';
// 显示失败信息
import {message} from 'antd';
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
 
// 创建一个 instance ,指定一些属性
const instance = axios.create({
  timeout:10000 // 超时时间
});

// 请求拦截器, 传一个回调函数，参数 config配置对象,必须返回
/* 
config{
  url,
  method,
  data:{username,password}
}
*/
instance.interceptors.request.use((config)=>{
  // 显示进度条
  NProgress.start();





});