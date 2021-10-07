import React, {Component} from 'react';
import axios from "axios";
import {config} from "../../../config";
import "./CategoriesPicker.css";
import CategoryMiniature from "../category/CategoryMiniature";
import Header from "../../header/Header";

class CategoriesPicker extends Component {

    constructor() {
        super();
        this.state = {
            status: "",
            categories: []
        };
    }

    componentDidMount() {
        axios.get(config.productMicroservice + '/categories').then(
            response => {
                if(response.data.status === true) {
                    this.setState({
                        categories: response.data.message,
                        status: response.data.status
                    });
                }
            }
        ).catch(err => {
            console.log("Categories are currently unavalible");
            this.setState({
                status: false
            });
        });
    }

    render() {
        if(this.state.status.toString() === "true") {
            return(
                <div>
                    <Header/>
                    <div className="categories-picker">
                        <div className="container mt-3">
                            <h1>Choose category </h1>
                            <hr/>
                            {this.state.categories.map((value, index) => {
                                return <CategoryMiniature category={value} key={index.toString()}/>
                            })}
                        </div>
                    </div>
                </div>
            );
        }

        if(this.state.status.toString() === "false") {
            return(
                <div>
                    <Header/>
                    <div className="categories-picker">
                        <div className="alert alert-danger">
                            <p><strong>Something went wrong ;(</strong></p>
                            <p>Please try again later...</p>
                        </div>
                    </div>
                </div>
            );
        }

        return <></>;
    }
}

export default CategoriesPicker;
