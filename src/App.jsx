import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, link } from 'react-router-dom'

import Login from './pages/login/Login.jsx'
import Admin from './pages/admin/Admin.jsx'

/*
应用根组件
 */
class App extends Component {

  render() {
    return (
      <BrowserRouter>

        <link to='/login'/>

        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/admin' component={Admin} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App