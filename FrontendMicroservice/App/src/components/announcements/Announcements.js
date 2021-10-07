import React, {Component} from 'react';
import axios from 'axios';

//COMPONENTS
import AnnouncementMiniature from "../announcement/miniature/AnnouncementMiniature";

class Announcements extends Component {

    constructor() {
        super();
        this.state = {
            announcements: []
        };
    }

    componentDidMount() {

        if(this.props.apiUrl){
            let apiUrl = this.props.apiUrl;
            axios.get(apiUrl).then(
                result => {
                    let status = result.data.status;
                    if(status.toString() === "true") {
                        let announcements = result.data.message;
                        this.setState({
                            announcements: announcements
                        });
                    }
                }
            ).catch(
                err => {
                    console.log(err);
                }

            );
        }

    }

    render() {

        return(
          <div className="announcements">
              <div className="container mt-3">
                  <h1>Announcements <i className="fas fa-bullhorn"></i></h1>
                  <hr/>
                  {this.state.announcements.map((value, index) => {
                      return <AnnouncementMiniature announcement={value} key={index.toString()}/>
                  })}
              </div>
          </div>
        );
    }
}

export default Announcements;
