import React, { Component } from "react";
import { Form, Icon, Input, Button } from 'antd';
// 把 UI 组件包装成容器组件
import { connect } from 'react-redux'
// 跳转页面
import {Redirect} from 'react-router-dom'

import logo from './images/logo.png';
import './login.less';
import {loginAsync} from '../../redux/action-creators/user'

const { Item } = Form;

@connect(
  state => ({hasLogin: state.user.hasLogin})
,{loginAsync}
)
@Form.create()
class Login extends Component {

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.form.validateFields((errors, values) => {
      if (!errors) { // 验证成功发起请求
        const {username, password} = values
        this.props.loginAsync(username, password);
      } else {
        
      }
    });
  }
  
  validatePwd = (rule, value, callback)=>{
    const length = value && value.length;
    if (!value) {
      callback('密码不能为空哦！')
    } else if(length<4) {
      callback('密码不能小于4哦！')
    }else if(length>12) {
      callback('密码不能大于12哦！')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成哦！')
    } else{
      callback() // cheng gong 
    }
  }

  render() {

    const {hasLogin} = this.props;
    if (hasLogin) { // 如果已经登陆, 自动跳转到admin界面
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
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
                getFieldDecorator('username', { // 配置对象
                  initialValue: '', // 初始值
                  // 声明式验证: 利用已有的验证规则进行验证, 不用亲自判断
                  rules: [
                    { required: true, whitespace: true, message: '用户名必须输入' },
                    { min: 4, message: '用户名不能小于4位' },
                    { max: 12, message: '用户名不能大于12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                  ],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名"/>
                )
              }
            </Item>
            <Item>
              {
                getFieldDecorator('password', {
                  initialValue: '', // 初始值
                  rules: [
                    // 自定义验证
                    { validator: this.validatePwd }
                  ]
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码"/>
                )
              }
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
            </Item>
          </Form>
        </div>
      </div>
    )
  }
}
/* export default connect(
  state => ({hasLogin: state.user.hasLogin})
  ,{loginAsync}
  )(Form.create()(Login)); */
export default Login;