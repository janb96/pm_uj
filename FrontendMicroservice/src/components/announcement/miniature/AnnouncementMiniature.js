import React, {Component} from 'react';
import {config} from './../../../config';
import {Link} from "react-router-dom";

//CSS FILES
import './AnnouncementMiniature.css';
import AddToFavorites from "../../user/favorites/AddToFavorites";

class AnnouncementMiniature extends Component {

    render() {

        return(
                <div className="announcement-miniature">
                    <Link to={"/announcement/" + this.props.announcement._id}>
                        <div className="row">
                            <div className="col-sm-8">
                                <h3 className="announcement-miniature-title">{this.props.announcement.announcementTitle}</h3>
                                <div className="announcement-miniature-description">
                                    <p>{(this.props.announcement.announcementDescription).slice(0, 200) + "..."}</p>
                                </div>
                                <div className="announcement-miniature-data">
                                    <p><kbd>Price:</kbd>{this.props.announcement.announcementPrice}</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <img alt={this.props.announcement.announcementTitle} src={config.fileMicroservice + "/img/" + this.props.announcement.photoUrlArray[0]} width="200" height="200"/>
                            </div>
                        </div>
                    </Link>
                    <div className="row">
                        <div className="col-6">
                            <AddToFavorites announcementID={this.props.announcement._id }/>
                        </div>
                        <div className="col-6">
                            <p>Active: <i className={"fas fa-circle " + this.props.announcement.isActive}></i></p>
                        </div>
                    </div>
                    <hr/>
                </div>
        );
    }

}

export default AnnouncementMiniature;
