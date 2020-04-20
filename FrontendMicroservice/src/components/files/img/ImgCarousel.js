import React, {Component} from 'react';
import {config} from './../../../config';

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
                <div className="img-carousel">
                    <div className="img-carousel-img-box">
                        <img src={config.fileMicroservice + "/img/" + this.props.imgFiles[this.state.count]} alt=""/>
                    </div>
                    <i onClick={this.downCounter} className="fas fa-arrow-left fa-3x"></i>
                    <i onClick={this.upCounter} className="fas fa-arrow-right fa-3x"></i>
                    <p>{this.state.count + 1} of {this.props.imgFiles.length}</p>
                </div>
            );
        } else {
            return "";
        }

    }
}

export default ImgCarousel;
