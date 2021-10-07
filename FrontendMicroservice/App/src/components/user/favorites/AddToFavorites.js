import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../../config';
import Swal from 'sweetalert2';
import "./AddToFavorites.css";

class AddToFavorites extends Component {

    constructor() {
        super();
        this.state = {
            isFavorite: ""
        };

        this.addToFavourites = this.addToFavourites.bind(this);
        this.getFavorites = this.getFavorites.bind(this);
        this.deleteFromFavorites = this.deleteFromFavorites.bind(this);
    }

    getFavorites() {
        axios.get(config.socialMicroservice + "/user/favouriteAnnouncements").then(
            response => {
                if(response.data.status.toString() === "true") {
                    let favoriteAnnouncements = response.data.message;
                    this.setState({
                       isFavorite:  favoriteAnnouncements.includes(this.props.announcementID)
                    });
                }
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    addToFavourites() {

        const favorite = {
            announcementID: this.props.announcementID
        };

        axios.post(config.socialMicroservice + "/user/favouriteAnnouncements", favorite).then(
            response => {
                console.log(response);
                let status = response.data.status;
                let message = response.data.message;
                if(status.toString() === "true") {
                    this.setState({
                        isFavorite: true
                    });
                    Swal.fire(
                        "Success",
                        "Announcement was add to favorites",
                        'success'
                    );
                } else {
                    Swal.fire(
                        "Error",
                        message,
                        'error'
                    );
                }
            }
        ).catch(
            err => {
                console.log(err);
                Swal.fire(
                    "Error",
                    "Something gone wrong ;(",
                    'error'
                );
            }
        );

    };

    deleteFromFavorites() {
        axios.delete(config.socialMicroservice + "/user/favouriteAnnouncements", { data: {announcementID: this.props.announcementID}}).then(
            response => {
                console.log(response);
                let status = response.data.status;
                let message = response.data.message;
                if(status.toString() === "true") {
                    this.setState({
                        isFavorite: false
                    });
                    Swal.fire(
                        "Success",
                        "Announcement was deleted from favorites",
                        'success'
                    );
                } else {
                    Swal.fire(
                        "Error",
                        message,
                        'error'
                    );
                }
            }
        ).catch(
            err => {
                console.log(err);
                Swal.fire(
                    "Error",
                    "Something gone wrong ;(",
                    'error'
                );
            }
        );
    }

    componentDidMount() {
        this.getFavorites();
    }

    render() {

        if(this.state.isFavorite.toString() === "true") {
            return(
                <div className="favorite-heart-true" onClick={this.deleteFromFavorites}>
                    <i className="fas fa-heart">Delete from favourites</i>
                </div>
            );
        } else {
            return (
                <div className="favorite-heart-false" onClick={this.addToFavourites}>
                    <i className="far fa-heart">Add to favourites</i>
                </div>
            );
        }



    }
}

export default AddToFavorites;
