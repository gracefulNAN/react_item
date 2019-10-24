import React,{ Component } from "react";
import {Router, Route, Switch} from 'react-router-dom'

import Admin from './containers/admin';
import Login from './containers/login';
import history from './history';

class App extends Component{
  render(){
    return (
      <Router history={history}>
        <Switch>
          <Route path='/login' component={Login} exact />
          <Route path='/' component={Admin} />
        </Switch>
      </Router>
    )
  }
}

export default App;