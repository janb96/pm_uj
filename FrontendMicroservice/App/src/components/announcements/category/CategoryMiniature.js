import React, {Component} from 'react';
import {config} from "../../../config";
import "./CategoryMiniature.css";
import {Link} from "react-router-dom";

class CategoryMiniature extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    render() {

        if(this.props.category) {
            return (
                <div className="category-miniature">
                    <Link to={"/announcements/category/" + this.props.category.categoryID}>
                        <div className="row">
                            <div className="col-md-8">
                                <h3>{this.props.category.categoryName}</h3>
                                <div className="category-miniature-description">
                                    <p>{this.props.category.categoryDescription}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <img
                                    className="category-miniature-image"
                                    alt={this.props.category.categoryName}
                                    src={config.fileMicroservice + "/img/" + this.props.category.categoryImageUrl + ".jpg"}
                                />
                            </div>
                        </div>
                        <hr/>
                    </Link>
                </div>
            );
        }

        return <></>;

    }
}

export default CategoryMiniature;
