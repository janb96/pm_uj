import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';

class SubcategorySelect extends Component {

    constructor() {
        super();
        this.state = {
            subcategories: [],
            status: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.loadSubcategories = this.loadSubcategories.bind(this);
    }

    handleChange(event) {
        let stateName = event.target.id;
        this.setState({
            [stateName]: event.target.value
        });
        if(this.props.subcategoryHandler) {
            this.props.subcategoryHandler(event.target.value);
        }
    }

    loadSubcategories() {
        if(this.props.categoryID !== "") {
            console.log("LOAD");
            axios.get(config.productMicroservice + '/subcategories/byCategory/' + this.props.categoryID).then(
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
            });
        }
    }

    componentDidMount() {
        if(this.props.categoryID && this.props.categoryID !== "") {
            this.loadSubcategories();
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.categoryID !== prevProps.categoryID) {
            this.loadSubcategories();
        }
    }

    render() {
        if(this.props.categoryID !== "") {
            console.log("TU");
            return (
                <div className="form-group">
                    <label>Choose category</label>
                    <select id="subcategory" className="form-control" onChange={this.handleChange} required>
                        <option value=""></option>
                        {this.state.subcategories.map((value, index) => {
                            return(
                                <option value={value.subcategoryID} key={index.toString()}>
                                    {value.subcategoryName}
                                </option>
                            );
                        })}
                    </select>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

export default SubcategorySelect;
