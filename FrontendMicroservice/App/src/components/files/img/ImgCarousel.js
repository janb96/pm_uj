import React, {Component} from 'react';
import {config} from './../../../config';
import './ImgCarousel.css';

class ImgCarousel extends Component {

    constructor() {
        super();
        this.state = {
            count: 0
        };
        this.upCounter = this.upCounter.bind(this);
        this.downCounter = this.downCounter.bind(this);
    }

    upCounter() {

        if(this.props.imgFiles.length > 0) {
            let value = this.state.count;
            value++;
            if(value >= this.props.imgFiles.length) {
                value = 0;
            }
            let newCountValue = value;
            this.setState({
                count: newCountValue
            });
        }

    }

    downCounter() {

        if(this.props.imgFiles.length > 0) {
            let value = this.state.count;
            value--;
            if(value < 0) {
                value = this.props.imgFiles.length - 1;
            }
            let newCountValue = value;
            this.setState({
                count: newCountValue
            });
        }

    }

    render() {

        if(this.props.imgFiles.length > 0) {
            return (
                <div className="container text-center">
                    <div className="img-carousel">
                        <img id="carouselImg" className="img-fluid" src={config.fileMicroservice + "/img/" + this.props.imgFiles[this.state.count]} alt=""/>
                    </div>
                    <div className="img-arrows">
                        <i onClick={this.downCounter} className="fas fa-arrow-alt-circle-left fa-3x"></i>
                        <i onClick={this.upCounter} className="fas fa-arrow-alt-circle-right fa-3x"></i>
                    </div>
                    <p>{this.state.count + 1} of {this.props.imgFiles.length}</p>
                </div>
            );
        } else {
            return "";
        }

    }
}

export default ImgCarousel;
