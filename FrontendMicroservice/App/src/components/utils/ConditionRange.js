import React, {Component} from 'react';

class ConditionRange extends Component {

    constructor() {
        super();
        this.state = {
            condition: "",
            status: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            condition: event.target.value
        });
        if(this.props.conditionHandler) {
            this.props.conditionHandler(event.target.value);
        }
    }

    render() {
        return (
            <div className="radio-input">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" id="other" onChange={this.handleChange} value="other"
                           name="condition" required/>
                    <label className="form-check-label" htmlFor="other">Other</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" id="new" onChange={this.handleChange} value="new" name="condition"/>
                    <label className="form-check-label" htmlFor="new">New</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" id="used" onChange={this.handleChange} value="used" name="condition"/>
                    <label className="form-check-label" htmlFor="used">Used</label>
                </div>
            </div>
        );
    }
}

export default ConditionRange;
