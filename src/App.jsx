import React,{ Component } from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Admin from './containers/admin/Admin';
import Login from './containers/login/Login'

class App extends Component{
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} exact />
          <Route path='/admin' component={Admin} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;