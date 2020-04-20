import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Header extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div className = "container-fluid p-3 bg-dark text-white text-center">
                    <div className="row">
                        <div className="col-3">
                            <Link className="white-link" to="/">
                                Home
                            </Link>
                        </div>
                        <div className="col-3">
                            <Link className="white-link" to="/">
                                Home
                            </Link>
                        </div>
                        <div className="col-3">
                            <Link className="white-link" to="/announcement/add">
                                Add announcement
                            </Link>
                        </div>
                        <div className="col-3">
                            <Link className="white-link" to="/user/login">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}

export default Header;
