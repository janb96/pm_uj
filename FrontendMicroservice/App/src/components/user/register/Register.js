import React, {Component} from 'react';
import axios from 'axios';
import Header from './../../header/Header';
import './Register.css';
import {config} from './../../../config';
import BackendResponse from "./../../feedback/BackendResponse";
import {Link} from "react-router-dom";

class Register extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            phone: "",
            agreement1: false,
            agreement2: false,
            agreement3: false,
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
            password: this.state.password,
            phone: this.state.phone,
            agreement1: this.state.agreement1,
            agreement2: this.state.agreement2,
            agreement3: this.state.agreement3
        };
        axios.post(config.authMicroservice + "/user/registration", postData).then(
            response => {
                if(response.data.status !== true) {
                    this.setState({
                        backendMessage: response.data.message,
                        status: response.data.status
                    });
                } else {
                    this.setState({
                        backendMessage: "Account created, verify Your e-mail address.",
                        status: response.data.status
                    });
                    window.sessionStorage.setItem("token", response.data.message.token);
                }
            }
        );
    }

    handleChange(event) {
        let stateName = event.target.id;
        let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        this.setState({
            [stateName]: value
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="sign-in-form">
                    <h1>Create a new account</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Email address (*)</label>
                            <input  onChange={this.handleChange} placeholder="Email address" type="email" className="form-control" id="email"/>
                        </div>
                        <div className="form-group">
                            <label>Password (*)</label>
                            <input  onChange={this.handleChange} placeholder="Password" type="password" className="form-control" id="password"/>
                        </div>
                        <div className="form-group">
                            <label>Phone number</label>
                            <input  onChange={this.handleChange} placeholder="Phone number (optional)" type="text" className="form-control" id="phone"/>
                        </div>
                        <div className="form-group">
                            <label>Website regulations (*)</label>
                            <input  onChange={this.handleChange} type="checkbox" className="form-control" id="agreement1"/>
                        </div>
                        <div className="form-group">
                            <label>Email marketing </label>
                            <input  onChange={this.handleChange} type="checkbox" className="form-control" id="agreement2"/>
                        </div>
                        <div className="form-group">
                            <label>Phone marketing</label>
                            <input  onChange={this.handleChange} type="checkbox" className="form-control" id="agreement3"/>
                        </div>
                        <button type="submit" className="btn btn-secondary btn-block">Register</button>
                        <BackendResponse status={this.state.status} backendMessage={this.state.backendMessage}/>
                    </form>
                    <p>
                        <Link to="/user/login">
                            or Sign in
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Register;
