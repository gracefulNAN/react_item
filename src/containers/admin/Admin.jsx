/*
后台管理主路由组件
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

// 当推出 admin 界面时， 调用删除 user token 函数
import { removeUserToken } from '../../redux/action-creators/user'

class Admin extends Component {
  logout = () => {
    this.props.removeUserToken()
  }
  render() {

    // 当 hasLogin 的值是 false 时，要跳转到 login 界面
    if (!this.props.hasLogin) {
      return <Redirect to="/login"/>
    }

    return (
      <div>
        <h2>Hello,{this.props.user.username}</h2>
        <button onClick={this.logout}>退出登陆</button>
      </div>
    )
  }
}

export default connect(
  (state)=>{ return {user:state.user.user, hasLogin:state.user.hasLogin} },
  {removeUserToken}
)(Admin)