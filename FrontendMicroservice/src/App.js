import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import axios from 'axios';
import './App.css';

axios.defaults.withCredentials = true;
axios.defaults.headers['x-access-token'] = window.sessionStorage.getItem("token");

class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/login' component={Login}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
