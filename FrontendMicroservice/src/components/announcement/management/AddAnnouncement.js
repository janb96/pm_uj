import React, {Component} from 'react';
import axios from 'axios';
import Header from './../../header/Header';
import './AddAnnouncement.css';
import PdfSender from './../../files/pdf/PdfSender';
import PdfList from './../../files/pdf/PdfList';
import ImgSender from './../../files/img/ImgSender';
import ImgCarousel from './../../files/img/ImgCarousel';
import CategorySelect from "../../utils/CategorySelect";
import SubcategorySelect from "../../utils/SubcategorySelect";
import ConditionRange from "../../utils/ConditionRange";
import {config} from './../../../config';
import BackendResponse from "./../../feedback/BackendResponse";

class AddAnnouncement extends Component {

    constructor() {
        super();
        this.state = {
            pdfFiles: [],
            imgFiles: [],
            backendMessage: "",
            status: "",
            announcementTitle: "",
            announcementDescription: "",
            announcementPrice: "",
            categoryID: "",
            subcategoryID: "",
            condition: ""
        };

        this.pdfHandler = this.pdfHandler.bind(this);
        this.imgHandler = this.imgHandler.bind(this);
        this.categoryHandler = this.categoryHandler.bind(this);
        this.subcategoryHandler = this.subcategoryHandler.bind(this);
        this.conditionHandler = this.conditionHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    handleSubmit(event) {

        event.preventDefault();

        const postData = {
            announcementTitle: this.state.announcementTitle,
            announcementDescription: this.state.announcementDescription,
            announcementPrice: this.state.announcementPrice,
            photoUrlArray: this.state.imgFiles,
            pdfFiles: this.state.pdfFiles,
            categoryID: this.state.categoryID,
            subcategoryID: this.state.subcategoryID,
            condition: this.state.condition
        };

        axios.post(config.productMicroservice + "/announcements", postData).then(
            response => {
                if(response.data.status !== true) {
                    this.setState({
                        backendMessage: response.data.message,
                        status: response.data.status
                    });
                } else {
                    this.setState({
                        backendMessage: "The announcement has been added",
                        status: response.data.status
                    });
                }
            }
        );

    }

    pdfHandler(pdfFiles) {
        let files = this.state.pdfFiles;
        files.push(pdfFiles);
        this.setState({
           pdfFiles: files
        });
    }

    imgHandler(imgFiles) {
        let files = this.state.imgFiles;
        files.push(imgFiles);
        this.setState({
            imgFiles: files
        });
    }

    categoryHandler(categoryID) {
        this.setState({
            categoryID: categoryID,
            subcategoryID: ""
        });
    }

    subcategoryHandler(subcategoryID) {
        this.setState({
            subcategoryID: subcategoryID
        });
    }

    conditionHandler(condition) {
        this.setState({
            condition: condition
        });
    }

    handleChange(event) {
        let stateName = event.target.id;
        let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        this.setState({
            [stateName]: value
        });
    }

    render() {

        return (
            <div>
                <Header/>
                <div className="add-announcement-form">
                    <h1>Add announcement</h1>
                </div>
                <ImgSender imgHandler={this.imgHandler} />
                <ImgCarousel imgFiles={this.state.imgFiles}/>
                <PdfSender pdfHandler={this.pdfHandler} />
                <PdfList pdfFiles={this.state.pdfFiles}/>
                <div className="add-announcement-form">
                    <form onSubmit={this.handleSubmit}>
                        <CategorySelect categoryHandler={this.categoryHandler}/>
                        <SubcategorySelect subcategoryHandler={this.subcategoryHandler} categoryID={this.state.categoryID}/>
                        <div className="form-group">
                            <label>Announcement title</label>
                            <input  onChange={this.handleChange} placeholder="Announcement title" type="text" className="form-control" id="announcementTitle"/>
                        </div>
                        <div className="form-group">
                            <label>Announcement description</label>
                            <textarea  onChange={this.handleChange} placeholder="Announcement description" rows="16" className="form-control" id="announcementDescription"/>
                        </div>
                        <div className="form-group">
                            <label>Item/service price</label>
                            <input  onChange={this.handleChange} placeholder="Item/service price" type="number" className="form-control" id="announcementPrice" min="0.00" step="0.01"/>
                        </div>
                        <ConditionRange conditionHandler={this.conditionHandler}/>
                        <button type="submit" className="btn btn-secondary btn-block">Add announcement</button>
                        <BackendResponse status={this.state.status} backendMessage={this.state.backendMessage}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddAnnouncement;
