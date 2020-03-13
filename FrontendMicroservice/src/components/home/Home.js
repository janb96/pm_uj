import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Header from './../header/Header';
import {config} from './../../config';

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
            </div>
        );
    }
}

export default Home;
