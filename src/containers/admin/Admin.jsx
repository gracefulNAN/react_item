import React, { Component } from "react";
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

import { removeUserToken } from '../../redux/action-creators/user'
import { reqUsers } from '../../api'


@connect(state => ({user: state.user.user, hasLogin: state.user.hasLogin})
,{removeUserToken})
class Admin extends Component {

  logout = () =>{
    this.props.removeUserToken();
  }

  logout1 =async () => {
    await reqUsers();
  }

  render() {

    if (!this.props.hasLogin) {
      return <Redirect to="/login"/>
    }

    return (
      <div>
        <p>Hello, {this.props.user.username}</p>
        <button onClick={this.logout}>退出登陆</button>
        <button onClick={this.logout1}>qingqiu</button>
      </div>
    )
  }
}
/* export default connect(
  state => ({user: state.user.user, hasLogin: state.user.hasLogin})
  ,{removeUserToken}
)(Admin); */
export default Admin;