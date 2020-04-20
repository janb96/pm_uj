import React, {Component} from 'react';
import axios from 'axios';
import {config} from './../../config';

class CategorySelect extends Component {

    constructor() {
        super();
        this.state = {
            categories: [],
            status: false
        };

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        let stateName = event.target.id;
        this.setState({
            [stateName]: event.target.value
        });
        if(this.props.categoryHandler) {
            this.props.categoryHandler(event.target.value);
        }
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
        });
    }

    render() {
        return (
            <div className="form-group">
                <label>Choose category</label>
                <select id="category" className="form-control" onChange={this.handleChange} required>
                    <option value=""></option>
                {this.state.categories.map((value, index) => {
                    return(
                        <option value={value.categoryID} key={index.toString()}>
                            {value.categoryName}
                        </option>
                    );
                })}
                </select>
            </div>
        );
    }
}

export default CategorySelect;
