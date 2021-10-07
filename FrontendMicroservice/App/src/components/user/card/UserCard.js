import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../../config';
import {Link} from "react-router-dom";
import "./UserCard.css";
import Swal from 'sweetalert2';

class UserCard extends Component {

    constructor() {
        super();
        this.state = {
            profilePicture: "user-card.jpg"
        };

        this.sendMessage = this.sendMessage.bind(this);

    }

    sendMessage() {
        Swal.fire({
            title: 'Type your message',
            input: 'textarea',
            showCancelButton: true,
            confirmButtonText: 'Send!',
            preConfirm: (response) => {
                return axios.post(config.socialMicroservice + "/user/sendMessage", {
                    userID: this.props.userID,
                    message: response,
                    announcementID: this.props.announcementID
                }).catch( error => {
                    Swal.fire(
                        "Error",
                        "Please try again later!",
                        'error'
                    );
                });
            }
        }).then(
            result => {

                let status;
                let message;

                try {
                    status = result.value.data.status;
                    message = result.value.data.message;

                    console.log(status);
                    console.log(message);

                    if(status.toString() === "true") {
                        Swal.fire(
                            "Success!",
                            message,
                            'success'
                        );
                    } else {
                        Swal.fire(
                            "Error",
                            message,
                            'error'
                        );
                    }

                } catch(err) {
                    Swal.fire(
                        "Error",
                        "Please try again later!",
                        'error'
                    );
                }
            }
        );
    }

    render() {

        if(this.props.isAnnouncement) {
            if(this.props.isAnnouncement.toString() === "true") {
                return(
                    <div className="user-profile-card">
                        <img src={config.fileMicroservice + "/img/" + this.state.profilePicture} alt="Profile picture"/>
                        <kbd>Advertiser</kbd>
                        <p className="user-nickname">({this.props.emailHash})</p>
                        <Link to={"/announcements/search/?emailHash=" + this.props.emailHash}>Show Other Announcements</Link>
                        <button className="btn btn-danger btn-block" onClick={this.sendMessage}>Send a message <i className="far fa-envelope"></i></button>
                    </div>
                );
            }
        }
    }

}

export default UserCard;
