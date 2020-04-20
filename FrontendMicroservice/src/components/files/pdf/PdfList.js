import React, {Component} from 'react';
import {config} from './../../../config';

class PdfList extends Component {

    render() {

        if(this.props.pdfFiles.length > 0) {
            return (
                <div className="pdf-list">
                    <p>PDF related to the announcement:</p>
                    {this.props.pdfFiles.map((value, index) => {
                        return <a target="_blank" key={index.toString()} rel="noopener noreferrer" href={config.fileMicroservice + "/pdf/" + value}><i className="far fa-file-pdf"/> PDF number: {index + 1}</a>
                    })}
                </div>
            );
        } else {
            return "";
        }

    }
}

export default PdfList;
