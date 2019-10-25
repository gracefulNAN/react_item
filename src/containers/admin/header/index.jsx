/* 
管理界面头部
*/

import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'  // 高阶组件, 用来包装非路由组件
// 把时间格式化
import dayjs from 'dayjs'

import LinkButton from '../../../components/link-button'
import {removeUserToken} from '../../../redux/action-creators/user'

import './index.less'

@connect(
  state => ({username:state.user.user.username}),
  {removeUserToken}
  )
@withRouter
class className extends Component {

  state = {
    currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }

  // 退出按钮
  LinkBtn = () => {
    this.props.removeUserToken();
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      })
    }, 1000);
  }

  // 关闭定时器
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {

    // 获取时间
    const { currentTime } = this.state;
    // 获取用户名
    const {username} = this.props
    // 获取路径
    const path = this.props.location.pathname;

    return (
      <div className='header'>
        <div className='header-top'>
          <span>欢迎！{username}</span>
          <LinkButton onClick={this.LinkBtn}>退出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{path}</div>
          <div className='header-bottom-right'>
            <span>{currentTime}</span>
            <img src="http://api.map.baidu.com/images/weather/day/xiaoyu.png" alt="weather" />
            <span>shi jian</span>
          </div>
        </div>
      </div>
    )
  }
}
export default className;