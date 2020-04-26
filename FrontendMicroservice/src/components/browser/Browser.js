import React, {Component} from 'react';
import queryString from 'query-string';
import {config} from './../../config';

//CSS FILES
import './Browser.css';
import Header from "../header/Header";
import Announcements from "../announcements/Announcements";

function ShowAnnouncements(props) {
    const apiUrl = props.apiUrl;
    if(apiUrl === "") {
        return <></>;
    } else {
        return <Announcements apiUrl={props.apiUrl}/>;
    }
}

class Browser extends Component {

    constructor() {
        super();
        this.state = {
            url: "",
            params: {},
            search: "",
            searchParams: {},
            apiUrl: "",
            maxPrice: "",
            minPrice: ""
        };

        // this.orderBy = this.orderBy.bind(this);
        this.addSearchParams = this.addSearchParams.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSortBy = this.handleChangeSortBy.bind(this);
    }


    componentDidMount() {

        let url = this.props.match.url;
        let params = this.props.match.params;
        let search = this.props.location.search;
        let searchParams = queryString.parse(this.props.location.search);
        let apiUrl = config.productMicroservice + url + search;

        for(let parameter in searchParams) {
            this.setState({
                [parameter]: searchParams[parameter]
            })
        }

        this.setState({
            url: url,
            params: params,
            search: search,
            searchParams: searchParams,
            apiUrl: apiUrl,
            page: "1"
        });

    }

    addSearchParams(key, value) {
        let searchParams = this.state.searchParams;
        searchParams[key] = value;
        let search = "?" + queryString.stringify(searchParams);
        this.setState({
            search: search,
            searchParams: searchParams
        });
    }

    handleChange(event) {
        let stateName = event.target.id;
        this.setState({
            [stateName]: event.target.value
        });
        this.addSearchParams(stateName, event.target.value);
    }

    handleChangeSortBy(event) {

        let key = event.target.value;

        const dictionary = {

            dateOfCreation_up: {
                sortBy: "dateOfCreation",
                order: "1"
            },
            dateOfCreation_down: {
                sortBy: "dateOfCreation",
                order: "-1"
            },
            numberOfViews_up: {
                sortBy: "numberOfViews",
                order: "1"
            },
            numberOfViews_down: {
                sortBy: "numberOfViews",
                order: "-1"
            },
            announcementPrice_up: {
                sortBy: "announcementPrice",
                order: "1"
            },
            announcementPrice_down: {
                sortBy: "announcementPrice",
                order: "-1"
            },
            other: {
                sortBy: "",
                order: ""
            }

        };

        this.setState({
            sortBy: dictionary[key].sortBy,
            order: dictionary[key].order
        });

        this.addSearchParams("sortBy", dictionary[key].sortBy);
        this.addSearchParams("order", dictionary[key].order);
    }

    changeLocation() {
        console.log(this.state.url);
        console.log(this.state.url + this.state.search);

        let searchParams = this.state.searchParams;

        for(let parameter in searchParams) {
            if(searchParams[parameter].toString() === "") {
                delete searchParams[parameter];
            }
        }

        let search = "?" + queryString.stringify(searchParams);

        window.location.href = this.state.url + search;
    }

    render() {

        return(
            <div>
                <Header/>
                <div className="browser">
                    <div className="container mt-3">


                        <h3>Filters</h3>
                        <div className="row">
                            <div className="col-md-2">
                                <label>Min Price:</label>
                                <input value={this.state.minPrice} onChange={this.handleChange} placeholder="Min Price" type="number" className="form-control" id="minPrice" min="0.00" step="0.01"/>
                            </div>
                            <div className="col-md-2">
                                <label>Max Price:</label>
                                <input value={this.state.maxPrice} onChange={this.handleChange} placeholder="Max Price" type="number" className="form-control" id="maxPrice" min="0.00" step="0.01"/>
                            </div>
                            <div className="col-md-2">
                                <label>Condition:</label>
                                <select id="condition" className="form-control" onChange={this.handleChange}>
                                    <option value="" selected={this.state.condition === "" || this.state.condition == undefined}>All</option>
                                    <option value="new" selected={this.state.condition === "new"}>New</option>
                                    <option value="used" selected={this.state.condition === "used"}>Used</option>
                                    <option value="other" selected={this.state.condition === "other"}>Other</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <label>Activity:</label>
                                <select id="isActive" className="form-control" onChange={this.handleChange}>
                                    <option value="" selected={this.state.isActive === "" || this.state.isActive == undefined}>All</option>
                                    <option value="1" selected={this.state.isActive === "1"}>Active</option>
                                    <option value="0" selected={this.state.isActive === "0"}>Inactive</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label>Sort by:</label>
                                <select id="sortBy" className="form-control" onChange={this.handleChangeSortBy}>
                                    <option value="other" selected={this.state.sortBy === "" || this.state.sortBy == undefined}></option>
                                    <option value="announcementPrice_down" selected={this.state.sortBy === "announcementPrice" && this.state.order === "-1"}>Price ↓</option>
                                    <option value="announcementPrice_up" selected={this.state.sortBy === "announcementPrice" && this.state.order === "1"}>Price ↑</option>
                                    <option value="dateOfCreation_down" selected={this.state.sortBy === "dateOfCreation" && this.state.order === "-1"}>Date added ↓</option>
                                    <option value="dateOfCreation_up" selected={this.state.sortBy === "dateOfCreation" && this.state.order === "1"}>Date added ↑</option>
                                    <option value="numberOfViews_down" selected={this.state.sortBy === "numberOfViews" && this.state.order === "-1"}>Number of views ↓</option>
                                    <option value="numberOfViews_up" selected={this.state.sortBy === "numberOfViews" && this.state.order === "1"}>Number of views ↑</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <label>Items on page:</label>
                                <select id="itemsOnPage" className="form-control" onChange={this.handleChange}>
                                    <option value="" selected={this.state.itemsOnPage === "" || this.state.itemsOnPage == undefined}>Default</option>
                                    <option value="10" selected={this.state.itemsOnPage === "10"}>10</option>
                                    <option value="20" selected={this.state.itemsOnPage === "20"}>20</option>
                                    <option value="50" selected={this.state.itemsOnPage === "50"}>50</option>
                                </select>
                            </div>
                            <div className="col-md-10">
                            </div>
                        </div>
                        <br/>
                        <button onClick={this.changeLocation} className="btn btn-secondary btn-block">Search</button>
                    </div>
                </div>

                <ShowAnnouncements apiUrl={this.state.apiUrl}/>

                <div className="pagination-handler">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2">
                            </div>
                            <div className="col-md-8">
                                <div className="row text-center">
                                    <div className="col-6">
                                        <p><i className="fas fa-backward"></i> Previous Page</p>
                                    </div>
                                    <div className="col-6">
                                        <p>Next Page <i className="fas fa-forward"></i></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Browser;
