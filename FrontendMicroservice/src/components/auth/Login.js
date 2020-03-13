import React, {Component} from 'react';
import axios from 'axios';
import Header from './../header/Header';
import './Login.css';
import {config} from './../../config';
import BackendResponse from "../feedback/BackendResponse";

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            backendMessage: "",
            status: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    handleSubmit(event) {
        event.preventDefault();
        const postData = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post(config.authMicroservice + "/auth/authenticate", postData).then(
            response => {
                if(response.data.status !== true) {
                    this.setState({
                        backendMessage: response.data.message,
                        status: response.data.status
                    });
                } else {
                    this.setState({
                        backendMessage: "Password is correct",
                        status: response.data.status
                    });
                    window.sessionStorage.setItem("token", response.data.message.token);
                }
            }
        )
    }

    handleChange(event) {
        let stateName = event.target.id;
        this.setState({
            [stateName]: event.target.value
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="sign-in-form">
                    <h1>Sign in</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Email address</label>
                            <input  onChange={this.handleChange} placeholder="Email address" type="email" className="form-control" id="email"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input  onChange={this.handleChange} placeholder="Password" type="password" className="form-control" id="password"/>
                        </div>
                        <button type="submit" className="btn btn-secondary btn-block">Sign in</button>
                        <BackendResponse status={this.state.status} backendMessage={this.state.backendMessage}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
