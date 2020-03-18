import React, {Component} from 'react';
import axios from 'axios';
import Header from './../../header/Header';
import {config} from './../../../config';
import BackendResponse from "../../feedback/BackendResponse";

class Confirmation extends Component {

    constructor() {
        super();
        this.state = {
        };

    }

    componentDidMount() {

        let { p1, p2, p3 } = this.props.match.params;

        const confirmPostData = {
            p1: p1,
            p2: p2,
            p3: p3
        };

        let postResponse = axios.post(config.authMicroservice + '/user/confirm', confirmPostData).then(
            response => {
                if(response.data.status !== true) {
                    this.setState({
                        backendMessage: response.data.message,
                        status: response.data.status
                    });
                } else {
                    this.setState({
                        backendMessage: response.data.message,
                        status: response.data.status
                    });
                    window.sessionStorage.setItem("token", response.data.message.token);
                }
            }
        );

    }

    componentDidUpdate() {

    }

    render() {
        return (
            <div>
                <Header/>
                <BackendResponse status={this.state.status} backendMessage={this.state.backendMessage}/>
            </div>
        );
    }
}

export default Confirmation;
