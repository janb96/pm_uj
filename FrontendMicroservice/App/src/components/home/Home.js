import React, {Component} from 'react';
import Header from './../header/Header';
import "./Home.css";
import {Link} from "react-router-dom";

class Home extends Component {

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
                <Header/>
                <div className="home">

                    <div className="container">

                        <div className="row">
                            <div className="col-md-6">
                                <div className="protips">
                                    <h1>Do you want to add an announcement?</h1>
                                    <div className="step">
                                        <h3><kbd>Step 1:</kbd> <Link to="user/register">Create an Account</Link></h3>
                                        <h3><kbd>Step 2:</kbd> Click the link in the email and verify your account</h3>
                                        <h3><kbd>Step 3:</kbd> <Link to="user/register">Sign in</Link></h3>
                                        <h3><kbd>Step 4:</kbd> Add your awesome announcement!</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="protips">
                                    <h1>Do you want to find an announcement?</h1>
                                    <div className="step">
                                        <h3><kbd>Step 1:</kbd> Click on the <Link to="announcements/category">Announcements<i className="fas fa-bullhorn"></i> button</Link></h3>
                                        <h3><kbd>Step 2:</kbd> Select the category you are interested in</h3>
                                        <h3><kbd>Step 3:</kbd> Select the subcategory</h3>
                                        <h3><kbd>Step 4:</kbd> Use our search</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="protips">
                                    <h1>What else can you do?</h1>
                                    <div className="step">
                                        <h3><kbd>Feature1:</kbd> Send message <i className="far fa-envelope"></i> to the advertiser</h3>
                                        <h3><kbd>Feature2:</kbd> Add announcement to favorites <i className="fas fa-heart"></i></h3>
                                        <h3><kbd>Feature3:</kbd> In addition to filters in the search, you can change the number of items on the page</h3>
                                        <h3><kbd>Feature4:</kbd> You can see the ads of the selected advertiser</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="protips">
                                    <h1>Additional information</h1>
                                    <div className="step">
                                        <h3><kbd>Master thesis</kbd></h3>
                                        <h3><kbd>University:</kbd> Jagiellonian University</h3>
                                        <h3><kbd>Student</kbd> Jan Boduch</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default Home;
