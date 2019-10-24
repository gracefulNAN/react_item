/* 
封装一个用于检查用户登录的高级组件
*/

import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


// HocComponent 父组件；WrappedComponent 子组件，被包装的组件
export default function WithCheckLogin(WrappedComponent) {
  // 高级组件函数返回一个新的组件
  @connect((state) => ({hasLogin:state.user.hasLogin}))
  class HocComponent extends Component{
    render(){
      // 获取请求路由
      const path = this.props.location.pathname;
      // 获取属性，rest是包含其他所有属性的对象
      const {hasLogin, ...rest} = this.props;

      // 如果请求的是 login ，但已经登录，自动跳转到 admin
      if (path === '/login' && hasLogin) {
        return <Redirect to="/"/>;
      }
      // 请求不是 login ，但没有登录，自动跳转到 login
      if (path !== '/login' && !hasLogin) {
        return <Redirect to="/login"/>
      }

      // 将所有接收的属性传递给被包装组件
      return <WrappedComponent {...rest}/>
    }
  }
  return HocComponent;
}