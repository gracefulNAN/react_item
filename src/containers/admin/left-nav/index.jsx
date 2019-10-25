/* 
左导航
*/

import React, { Component } from "react";
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


import './index.less';
import logo from '../../../assets/images/logo.png'
import menuList from '../../../config/menu-config'
import { setHeaderTitle } from '../../../redux/action-creators/header-title'

const { SubMenu, Item } = Menu;

@connect(
  (state) => ({ headerTitle: state.headerTitle }),
  { setHeaderTitle }
)
@withRouter
class LeftNav extends Component {

  /* 
  使用map() + 递归调用 来生成多级菜单项的数组
  */
  getMenuNodes1 = (menuList) => {
    return menuList.map((item) => {
      // 判断是否包含 children ，来决定生成 <Item/> 或 <SubMenu/>
      if (!item.children) {
        return (
          <Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)} {/* 进行递归调用 */}
          </SubMenu>
        )
      }
    });
  }

  /* 
  使用 reduce() + 递归调用 来生成多级菜单项的数组
  */
  getMenuNodes = (menuList) => {

    return menuList.reduce((pre, item) => {

      const path = this.props.location.pathname;

      if (!item.children) {
        // 如果当前请求的就是item对应的路径, 将当前title保存到state中
        if (item.key === path && this.props.headerTitle !== item.title) {
          this.props.setHeaderTitle(item.title);
        }

        pre.push(
          <Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      } else {

        // 判断item的children有没有一个child的key与path一致
        if (item.children.some( item => item.key === path )) {
          this.openKey = item.key;
        }

        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)} {/* 进行递归调用 */}
          </SubMenu>
        );
      }

      return pre
    }, []);


  }

  render() {

    // 调用 getMenuNodes ，生成标签数组；
    const menuNodes = this.getMenuNodes(menuList);
    // 获取 路径
    const selectedKey = this.props.location.pathname;
    // 获取 key
    const openKey = this.openKey;

    return (
      <div className='left_nav'>
        <div className='lest_nav_top'>
          <img src={logo} alt="logo" />
          <span>商业云服</span>
        </div>
        <Menu
          mode="inline"
          theme="dark"
        selectedKeys={[selectedKey]}  // 当前选中的菜单项 key 数组
        defaultOpenKeys={[openKey]}  // 初始展开的 SubMenu 菜单项 key 数组
        >
          {menuNodes}

          {/* <Item key="/home">
            <Link to="/home">
              <Icon type="home" />
              <span>首页</span>
            </Link>
          </Item>
          <SubMenu
            key="/products"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Item key="/category">
              <Link to="/category">
                <Icon type="pic-left" />
                <span>分类管理</span>
              </Link>
            </Item>
            <Item key="/product">
              <Link to="/product">
                <Icon type="border-outer" />
                <span>商品管理</span>
              </Link>
            </Item>
          </SubMenu> */}
        </Menu>
      </div>
    )
  }
}
export default LeftNav;