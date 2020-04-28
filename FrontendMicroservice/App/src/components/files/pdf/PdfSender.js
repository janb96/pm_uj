import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../../config';
import BackendResponse from "./../../feedback/BackendResponse";
import FormData from 'form-data';
import Spin from './../../feedback/Spin';

class PdfSender extends Component {

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

        this.spinnerHandler(true);

        let files = Array.from(filesToSend);

        files = files.slice(0,2);

        files.forEach( (file) => {

            let fr = new FileReader();

            fr.readAsDataURL(file);

            fr.onload = (e) => {

                let fd = new FormData();
                fd.append("pdf", e.target.result);

                const axiosConfig = {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    }
                };

                axios.post(config.fileMicroservice + "/pdf", fd, axiosConfig).then(response => {
                        console.log(response);

                        if(response.data.status.toString() !== "true") {
                            this.setState({
                                backendMessage: response.data.message,
                                status: response.data.status
                            });
                        } else {
                            this.setState({
                                backendMessage: "PDF file was successfully sent!",
                                status: response.data.status
                            });

                            if(this.props.pdfHandler) {
                                this.props.pdfHandler(response.data.message.fileName);
                            }

                        }

                    }
                ).catch( error => {
                    this.setState({
                        backendMessage: "PDF file is too big ;(",
                        status: false
                    });
                });

            };

        });

        this.spinnerHandler(false);
    }

    handleChange(event) {
        this.sendFiles(event.target.files);
    }

    render() {
        return (
            <div>
                <div className="add-announcement-form">
                    <div className="form-group">
                        <label className="label-pdf" htmlFor="pdfFile">Add PDF File/Files (MAX 2, only PDF) <i className="far fa-file-pdf"></i></label>
                        <input onChange={this.handleChange} placeholder="File" type="file" className="form-control" id="pdfFile" multiple accept="application/pdf"/>
                    </div>
                    <Spin sending={this.state.sending}/>
                    <BackendResponse status={this.state.status} backendMessage={this.state.backendMessage}/>
                </div>
            </div>
        );
    }
}

export default PdfSender;
