import React, {Component} from 'react';

class BackendResponse extends Component {

    constructor(props) {
        super();
    }

    render() {

        let style = "";

        if(this.props.status === true) {
            style = "alert alert-success";
        }
        if(this.props.status === false) {
            style = "alert alert-danger";
        }

        return (
            <div className="backend-response">
                <div className={style}>
                    {this.props.backendMessage}
                </div>
            </div>
        );
    }
}

export default BackendResponse;
