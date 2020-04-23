import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../../config';

//COMPONENTS
import Header from "../../header/Header";
import ImgCarousel from './../../files/img/ImgCarousel';
import PdfList from "../../files/pdf/PdfList";
import UserCard from "../../user/card/UserCard";

//CSS FILES
import './AnnouncementCard.css';

class AnnouncementCard extends Component {

    constructor() {
        super();
        this.state = {

        };

        this.loadAnnouncementData = this.loadAnnouncementData.bind(this);
    }

    loadAnnouncementData(announcementID) {
        axios.get(config.productMicroservice + "/announcement/" + announcementID).then(
            response => {

                let responseStatus = response.data.status;
                let responseMessage = response.data.message;

                if(responseStatus.toString() !== "true" || responseMessage.length.toString() === "0") {
                    this.setState({
                        notFound: true
                    })
                } else {
                    if(responseMessage.length.toString() === "1") {
                        this.setState({
                            announcement: responseMessage[0]
                        });
                    }
                }
            }
        );
    }

    componentDidMount() {
        let { announcementID } = this.props.match.params;
        this.setState({
           announcementID: announcementID
        });
        this.loadAnnouncementData(announcementID);
    }

    getDescription() {
        let descriptionFromDb = this.state.announcement.announcementDescription;
        let splitDescription = descriptionFromDb.split('\n');

        let htmlDescription = {};

        for(let e of splitDescription) {
            console.log(e);
        }
    }

    render() {

        console.log(this.state);

        if(this.state.notFound) {
            return <div>404</div>
        } else if(this.state.announcement) {
            return (
                <div>
                    <Header/>
                    <div id="announcement">
                        <h1>Announcement Title: {this.state.announcement.announcementTitle}</h1>
                        <br/>
                        <hr/>
                        <br/>
                        <div className="row">
                            <div className="col-lg-8">
                                <ImgCarousel imgFiles={this.state.announcement.photoUrlArray}/>
                            </div>
                            <div className="col-lg-4">
                                <UserCard isAnnouncement={true} announcementID={this.state.announcementID} userID={this.state.announcement.userID} emailHash={this.state.announcement.emailHash}/>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="announcement-description">
                                    <h3>Description</h3>
                                    <p>
                                        {this.state.announcement.announcementDescription.split('\n').map((item) => {
                                            return <>{item}<br/></>
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="announcement-data">
                                    <h3>Announcement Data</h3>
                                    <p>ID (Announcement): {this.state.announcementID}</p>
                                    <p><kbd>Price</kbd> {this.state.announcement.announcementPrice}</p>
                                    <p><kbd>Condition</kbd> {this.state.announcement.condition}</p>
                                    <p><kbd>Expiration date</kbd> {new Date(this.state.announcement.expirationDate).toDateString()}</p>
                                    <PdfList pdfFiles={this.state.announcement.pdfFiles}/>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </div>
            );
        } else {
            return <div></div>
        }

    }
}

export default AnnouncementCard;
