import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../../config';
import BackendResponse from "./../../feedback/BackendResponse";
import FormData from 'form-data';
import Spin from './../../feedback/Spin';

class ImgSender extends Component {

    constructor() {
        super();
        this.state = {
            file: "",
            backendMessage: "",
            status: 0,
            sending: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendFiles = this.sendFiles.bind(this);
        this.spinnerHandler = this.spinnerHandler.bind(this);
    }

    componentDidMount() {

    }

    spinnerHandler(status) {
        this.setState({
            sending: status
        });
    }

    sendFiles(filesToSend) {

        let files = Array.from(filesToSend);

        files = files.slice(0,5);

        files.forEach( (file) => {

            this.spinnerHandler(true);

            let fr = new FileReader();

            fr.readAsDataURL(file);

            fr.onload = async (e) => {

                let fd = new FormData();
                fd.append("img", e.target.result);

                const axiosConfig = {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    }
                };

                axios.post(config.fileMicroservice + "/img", fd, axiosConfig).then(response => {

                        if(response.data.status.toString() !== "true") {
                            this.setState({
                                backendMessage: response.data.message,
                                status: response.data.status
                            });
                            this.spinnerHandler(false);
                        } else {

                            this.setState({
                                backendMessage: "Image was successfully sent!",
                                status: response.data.status
                            });

                            if(this.props.imgHandler) {
                                this.props.imgHandler(response.data.message.fileName);
                            }

                            this.spinnerHandler(false);
                        }

                    }
                ).catch( error => {
                    this.setState({
                        backendMessage: "Image: " + file.name + " is too big ;(",
                        status: false
                    });
                    this.spinnerHandler(false);
                });

            };

        });

    }

    handleChange(event) {
        this.sendFiles(event.target.files);
    }

    render() {
        return (
            <div>
                <div className="add-announcement-form">
                    <div className="form-group">
                        <label className="label-photo" htmlFor="image">Add Images (MAX 5, only JPG)<i className="far fa-images"></i></label>
                        <input onChange={this.handleChange} placeholder="Image" type="file" className="form-control" id="image" multiple accept="image/jpeg"/>
                    </div>
                    <Spin sending={this.state.sending}/>
                    <BackendResponse status={this.state.status} backendMessage={this.state.backendMessage}/>
                </div>
            </div>
        );
    }
}

export default ImgSender;
