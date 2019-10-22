import React, { Component } from 'react';
// 自动跳转
import {Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd';
// 把 UI 组件 ，包装成 容器函数
import { connect } from 'react-redux'

// 向 请求函数 传递 username password
import {loginAsync} from '../../redux/action-creators/user'
import logo from "./images/logo.png";
import './login.less';

const {Item} = Form;

class Login extends Component {
  
  login = (event)=>{
    event.preventDefault();
    // 对所有表单项进行统一的表单验证
    this.props.form.validateFields((err, values)=>{
      if (!err) {
        // 校验成功
        const { username, password } = values
        
        // 向请求函数传入 username password
        this.props.loginAsync(username, password)
      } else {
       
      }
    })
  }

  validator = (reul,value,callback)=>{
    const length = value && value.length;
    const pwdReg = /^[A-Za-z0-9_]+$/
    if(!value){
      callback('必须输入密码')
    }else if (length < 4) {
      callback('密码必须大于4位')
    } else if (length > 12) {
      callback('密码必须小于12位')
    } else if (!pwdReg.test(value)) {
      callback('密码必须是英文、数组或下划线组成')
    } else {
      callback() // 必须调用callback
    }
  }

  render() {

    const { hasLogin } = this.props;
    if (hasLogin) { // 如果已经登录，自动跳转的 admin 界面
      return <Redirect to="/"/>
    }

    const { getFieldDecorator } = this.props.form;

    return (
      <div className='login'>
        <header className='login_header'>
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </header>
        <div className='login_content'>
          <h2>用户登录</h2>
          <Form onSubmit={this.login} className="login-form">
            <Item>
              {
                getFieldDecorator('username', {
                  // 根据内置验证规则进行声明式验证
                  rules: [
                    {required: true, whitespace: true, message: '必须输入用户名'},
                    {min: 4, message: '用户名必须大于4位'},
                    {max: 12, message: '用户名必须小于12位'},
                    {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成'}
                  ]
                })(
                  <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
                )
              }
            </Item>
            <Item>
              {
                getFieldDecorator('password', {
                  rules: [
                    // 自定义表单校验规则
                    {validator: this.validator}
                  ]
                })(
                  <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                         placeholder="密码"/>
                )
              }
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({hasLogin: state.user.hasLogin}), // hasLogin 状态改变
  {loginAsync} // 向 UI 组件 传递请求函数
)(Form.create()(Login));