import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {checkToken} from "../../utils/checkToken";
import "./Header.css";

class Header extends Component {

    constructor() {
        super();
        this.state = {
            isLogin: ""
        };
    }

    async componentDidMount() {
        this.setState({
            isLogin: await checkToken()
        });
    }

    render() {

        if(this.state.isLogin.toString() === "true") {
            return (
                <div>
                    <div className = "container-fluid p-3 bg-dark text-center">
                        <div className = "header-custom">
                            <div className="row">
                                <div className="col-3">
                                    <Link className="white-link" to="/">
                                        Home <i className="fas fa-globe-europe"></i>
                                    </Link>
                                </div>
                                <div className="col-3">
                                    <Link className="white-link" to="/announcements/category">
                                        Announcements <i className="fas fa-bullhorn"></i>
                                    </Link>
                                </div>
                                <div className="col-3">
                                    <Link className="white-link" to="/manage/announcement/add">
                                        Add Announcement <i className="fas fa-plus-square"></i>
                                    </Link>
                                </div>
                                <div className="col-3">
                                    <Link className="white-link" to="/user/panel">
                                        <i className="fas fa-user-circle fa-2x"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className = "container-fluid p-3 bg-dark text-center">
                    <div className="header-custom">
                        <div className="row">
                            <div className="col-md-3">
                                <Link className="white-link" to="/">
                                    Home <i className="fas fa-globe-europe"></i>
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <Link className="white-link" to="/announcements/category">
                                    Announcements <i className="fas fa-bullhorn"></i>
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <Link className="white-link" to="/user/login">
                                    Sign in <i className="fas fa-sign-in-alt"></i>
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <Link className="white-link" to="/user/register">
                                    Create Account <i className="fas fa-user-circle"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default Header;
