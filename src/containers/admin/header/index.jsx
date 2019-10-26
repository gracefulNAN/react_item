/* 
管理界面头部
*/

import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'  // 高阶组件, 用来包装非路由组件
import { Modal, Button, Icon } from 'antd'
import screenfull from 'screenfull'
// 把时间格式化
import dayjs from 'dayjs'

import LinkButton from '../../../components/link-button'
import { removeUserToken } from '../../../redux/action-creators/user'
import { reqWeather } from '../../../api';


import './index.less'

@connect(
  state => ({
    username: state.user.user.username,
    headerTitle: state.headerTitle
  }),
  { removeUserToken }
)
@withRouter
class className extends Component {

  state = {
    currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    dayPictureUrl: '', // 天气图标
    weather: '',   // 天气文本
    isFullScreen: false, // 是否全屏状态
  }

  // 退出按钮
  LinkBtn = () => {
    Modal.confirm({
      title: '哦~！您真的要离开吗？',
      okText: '悄悄地走',
      cancelText: '再呆会儿',
      onOk: () => {
        this.props.removeUserToken()
        Modal.destroyAll();
      },
      onCancel: () => { }
    });
  }



  // 天气
  showWeather = async () => {
    const { weather, dayPictureUrl } = await reqWeather('北京');
    this.setState({
      dayPictureUrl,
      weather
    });
  }

  // 全屏状态
  handleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      })
    }, 1000);

    // 更新天气
    this.showWeather();

    // screenfull 绑定 onchange
    screenfull.onchange(() => {
      this.setState({
        isFullScreen: !this.state.isFullScreen
      })
    });
  }

  // 关闭定时器
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {

    // 获取时间
    const { currentTime, weather, dayPictureUrl, isFullScreen } = this.state;
    // 获取用户名
    const { username, headerTitle } = this.props

    return (
      <div className='header'>
        <div className='header-top'>
          <Button size="small" onClick={this.handleFullScreen}>
            <Icon type={isFullScreen ? 'fullscreen-exit' : 'fullscreen'} />
          </Button>
          <span>欢迎！{username}</span>
          <LinkButton onClick={this.LinkBtn}>退出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{headerTitle}</div>
          <div className='header-bottom-right'>
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default className;