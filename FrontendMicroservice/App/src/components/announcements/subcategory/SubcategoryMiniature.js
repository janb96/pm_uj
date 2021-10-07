import React, {Component} from 'react';
import {config} from "../../../config";
import "./SubcategoryMiniature.css";
import {Link} from "react-router-dom";

class SubcategoryMiniature extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    render() {

        if(this.props.subcategory) {
            return (
                <div className="subcategory-miniature">
                    <Link to={"/announcements/search?categoryID=" +  this.props.subcategory.categoryID  +"&subcategoryID=" + this.props.subcategory.subcategoryID}>
                        <div className="row">
                            <div className="col-md-8">
                                <h3>{this.props.subcategory.subcategoryName}</h3>
                                <div className="subcategory-miniature-description">
                                    <p>{this.props.subcategory.subcategoryDescription}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <img
                                    className="subcategory-miniature-image"
                                    alt={this.props.subcategory.subcategoryName}
                                    src={config.fileMicroservice + "/img/" + this.props.subcategory.subcategoryImageUrl + ".jpg"}
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

export default SubcategoryMiniature;
