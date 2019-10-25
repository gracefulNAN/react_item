/* // import { connect } from 'react-redux'
// import { removeUserToken } from '../../redux/action-creators/user'
// import { reqUsers } from '../../api' */


import React, { Component } from "react";
import {Route, Switch, Redirect} from 'react-router-dom'
// 布局
import { Layout } from 'antd'

import WithCheckLogin from '../with-check-login';
import LeftNav from './left-nav';
import AdminHeader from './header';

import Home from '../../components/home'
import Category from '../category'
import Product from '../product'
import Role from '../role'
import User from '../user'
import Line from '../../components/charts/line'
import Bar from '../../components/charts/bar'
import Pie from '../../components/charts/pie'

const {Footer, Sider, Content /*  Header,  */} = Layout

@WithCheckLogin
class Admin extends Component {
  render() {
    return (
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <AdminHeader/>
          <Content style={{backgroundColor: 'white', margin: '30px 15px 0 15px'}}>
            <Switch>
              <Route path="/home" component={Home}/>
              <Route path="/category" component={Category}/>
              <Route path="/product" component={Product}/>
              <Route path="/role" component={Role}/>
              <Route path="/user" component={User}/>
              <Route path="/charts/line" component={Line}/>
              <Route path="/charts/bar" component={Bar}/>
              <Route path="/charts/pie" component={Pie}/>
              <Redirect to="/home"/>
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin;

/* export default connect(
  state => ({user: state.user.user, hasLogin: state.user.hasLogin})
  ,{removeUserToken}
)(Admin); */

/* if (!this.props.hasLogin) {
      return <Redirect to="/login"/>
    } */

