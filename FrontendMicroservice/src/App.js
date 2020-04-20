import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/user/login/Login';
import Register from './components/user/register/Register';
import Confirmation from "./components/user/confirm/Confirmation";
import AddAnnouncement from "./components/announcement/management/AddAnnouncement";
import axios from 'axios';
import './App.css';

axios.defaults.headers['x-access-token'] = window.sessionStorage.getItem("token");

class App extends Component {

  render() {

      console.log(axios.defaults.headers['x-access-token']);

    return (
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/user/login' component={Login}/>
            <Route path='/user/register' component={Register}/>
            <Route path='/user/confirm/:p1/:p2/:p3' component={Confirmation}/>
            <Route path='/announcement/add' component={AddAnnouncement}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
