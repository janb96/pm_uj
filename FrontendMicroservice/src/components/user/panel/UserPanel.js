import React, {Component} from 'react';
import axios from 'axios';
import Header from './../../header/Header';
import {config} from './../../../config';
import {Link, Redirect} from "react-router-dom";
import {checkToken} from './../../../utils/checkToken';
import "./UserPanel.css";
import UserCard from "../card/UserCard";

//TODO ...

class UserPanel extends Component {

    constructor() {
        super();
        this.state = {
            isLogin: null,
            profilePicture: "1850735f.jpg",
            userName: "Jan"
        };

    }

    async componentWillMount() {
        this.setState({
            isLogin: await checkToken()
        });
    }

    render() {

        if(this.state.isLogin == false) {
            return <Redirect to="/user/login"/>;
        }

        return (
            <div>
                <Header/>
                <div className="row">

                    <div className="col-md-6">
                        <UserCard/>
                    </div>

                    <div className="col-md-6">
                        <h1>My Account</h1>

                    </div>

                </div>
            </div>
        );

    }
}

export default UserPanel;
