import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/user/login/Login';
import Register from './components/user/register/Register';
import Confirmation from "./components/user/confirm/Confirmation";
import AddAnnouncement from "./components/announcement/management/AddAnnouncement";
import AnnouncementCard from "./components/announcement/announcement-card/AnnouncementCard";
import UserPanel from "./components/user/panel/UserPanel";
import Browser from "./components/browser/Browser";
import SubcategoriesPicker from "./components/announcements/subcategories/SubcategoriesPicker";
import CategoriesPicker from "./components/announcements/categories/CategoriesPicker";
import axios from 'axios';
import './App.css';

axios.defaults.headers['x-access-token'] = window.localStorage.getItem("token");

class App extends Component {

  render() {

    return (
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/user/panel' component={UserPanel}/>
            <Route path='/user/login' component={Login}/>
            <Route path='/user/register' component={Register}/>
            <Route path='/user/confirm/:p1/:p2/:p3' component={Confirmation}/>
            <Route path='/announcement/:announcementID' component={AnnouncementCard}/>
            <Route path='/announcements/search' component={Browser}/>
            <Route exact path='/announcements/category' component={CategoriesPicker}/>
            <Route path='/announcements/category/:categoryID' component={SubcategoriesPicker}/>
            <Route path='/manage/announcement/add' component={AddAnnouncement}/>
          </Switch>
        </BrowserRouter>
    );

  }
}

export default App;
