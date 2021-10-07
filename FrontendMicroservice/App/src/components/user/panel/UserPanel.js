import React, {Component} from 'react';
import Header from './../../header/Header';
import {Link, Redirect} from "react-router-dom";
import {getUserData} from './../../../utils/getUserData';
import "./UserPanel.css";
import Swal from 'sweetalert2';

class UserPanel extends Component {

    constructor() {
        super();
        this.state = {
            isLogin: "",
            emailHash: ""
        };

        this.signOut = this.signOut.bind(this);

    }

    async componentWillMount() {
        let userData = await getUserData();
        let isLogin = "";

        if(userData.toString() === "false") {
            isLogin = userData;
        } else {
            isLogin = userData.status;
        }

        console.log(isLogin);

        this.setState({
            isLogin: isLogin
        });

        if(isLogin.toString() === "true") {
            this.setState({
                userData: userData.message,
                emailHash: userData.message.emailHash
            })
        }
    }

    signOut() {
        Swal.fire({
            title: 'Do you want to sign out?',
            icon: 'question',
            iconHtml: "?",
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showCancelButton: true,
            showCloseButton: true
        }).then(
            result => {
                if(result.value) {
                    console.log("Bye ;)");
                    window.localStorage.removeItem("token");
                    window.location.href = "/user/login";
                } else {
                    console.log("Uff...");
                }
            }
        );
    }

    render() {

        if(this.state.isLogin.toString() === "false") {
            return <Redirect to="/user/login"/>;
        }

        return (
            <div>
                <Header/>
                <div className="container text-center">
                    <div className="user-panel">
                        <h1>My Account</h1>
                        <h2><i className="far fa-user-circle fa-5x"></i></h2>
                        <Link to={"/announcements/search/?emailHash=" + this.state.emailHash} className="btn btn-secondary btn-block">
                            My Announcements <i className="fas fa-bullhorn"></i>
                        </Link>
                        <Link to={"/manage/announcement/add"} className="btn btn-success btn-block">
                            Add Announcement <i className="fas fa-plus-square"></i>
                        </Link>
                        <button onClick={this.signOut} className="btn btn-danger btn-block">Sing out <i className="fas fa-sign-out-alt"></i></button>
                    </div>
                </div>
            </div>
        );

    }
}

export default UserPanel;
