import React, {Component} from 'react';
import axios from "axios";
import {config} from "../../../config";
import "./SubcategoriesPicker.css";
import SubcategoryMiniature from "../subcategory/SubcategoryMiniature";
import Header from "../../header/Header";
import {Link} from "react-router-dom";

class SubcategoriesPicker extends Component {

    constructor() {
        super();
        this.state = {
            status: "",
            subcategories: "empty",
            statusCategory: "",
            category: ""
        };
        this.loadSubcategories = this.loadSubcategories.bind(this);
        this.loadCategory = this.loadCategory.bind(this);
    }

    loadSubcategories(categoryID) {
        axios.get(config.productMicroservice + '/subcategories/byCategory/' + categoryID).then(
            response => {
                if(response.data.status === true) {
                    this.setState({
                        subcategories: response.data.message,
                        status: response.data.status
                    });
                }
            }
        ).catch(err => {
            console.log("Subcategories are currently unavalible");
            this.setState({
                status: false
            });
        });
    }

    loadCategory(categoryID) {
        axios.get(config.productMicroservice + '/categories/byCategoryID/' + categoryID).then(
            response => {
                if(response.data.status === true) {
                    this.setState({
                        category: response.data.message,
                        statusCategory: response.data.status
                    });
                }
            }
        ).catch(err => {
            console.log("Category is currently unavalible");
            this.setState({
                statusCategory: false
            });
        });
    }

    componentDidMount() {
        let { categoryID } = this.props.match.params;
        this.loadCategory(categoryID);
        this.loadSubcategories(categoryID);
    }

    render() {

        if(this.state.category == null) {
            return(
                <div>
                    <Header/>
                    <div className="subcategories-picker">
                        <div className="alert alert-danger">
                            <p><strong>The specified category does not exist</strong></p>
                            <p>Propably your URL is incorrect</p>
                        </div>
                    </div>
                </div>
            );
        }

        if(this.state.subcategories.length == 0) {
            return(
                <div>
                    <Header/>
                    <div className="subcategories-picker">
                        <div className="alert alert-danger">
                            <p><strong>This category does not have subcategories</strong></p>
                            <p>Propably this part of service is under construction</p>
                        </div>
                    </div>
                </div>
            );
        }

        if(this.state.status.toString() === "true" && this.state.statusCategory.toString() === "true") {
            return(
                <div>
                    <Header/>
                    <div className="category-card">
                        <div className="container mt-3">
                            <div className="alert alert-dark">
                                <h1><small>Category: {this.state.category.categoryName}</small></h1>
                                <Link to="/announcements/category" className="btn btn-danger">
                                    Change category <i className="far fa-arrow-alt-circle-left"></i>
                                </Link>
                            </div>

                        </div>
                    </div>
                    <div className="subcategories-picker">
                        <div className="container mt-3">
                            <h1>Choose subcategory</h1>
                            <hr/>
                            {this.state.subcategories.map((value, index) => {
                                return <SubcategoryMiniature subcategory={value} key={index.toString()}/>
                            })}
                        </div>
                    </div>
                </div>
            );
        }

        if(this.state.status.toString() === "false" || this.state.statusCategory.toString() === "false") {
            return(
                <div className="subcategories-picker">
                    <div className="alert alert-danger">
                        <p><strong>Something went wrong ;(</strong></p>
                        <p>Please try again later...</p>
                    </div>
                </div>
            );
        }

        return <></>;
    }
}

export default SubcategoriesPicker;
