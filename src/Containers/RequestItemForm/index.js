import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postRequestAction } from '../../Actions/RequestItemActions';
import '../../App.css';

class RequestItem extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            description: '',
            datetime: '',
            itemState: 3,
            monthsOld: '',
            quantityRequired: 0,
            maxPrice: 0,
            moreInfo: '',
            isButtonDisabled: false,
            errors: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({ errors: { ...this.state.errors, [e.target.name]: null } });
    }

    handleValidation() {
        const { name, description, datetime, monthsOld, quantityRequired, maxPrice } = this.state;
        const error = {};
        let formIsValid = true;
        if (!name || name.length < 2) {
            formIsValid = false;
            error.name = 'Item name should be atleast 2 character';
        } else if (!name.match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            error.name = 'Please enter alphabet characters only';
        }
        if (!description) {
            formIsValid = false;
            error.description = 'Description can not be empty';
        }
        if (!datetime) {
            formIsValid = false;
            error.datetime = 'Date time can not be empty';
        }
        if (!monthsOld) {
            formIsValid = false;
            error.monthsOld = 'Months can not be empty';
        } else if (monthsOld < 0) {
            formIsValid = false;
            error.monthsOld = 'Please enter valid input';
        }
        if (!quantityRequired) {
            formIsValid = false;
            error.quantityRequired = 'Please enter the required quantity';
        } else if (quantityRequired <= 0) {
            formIsValid = false;
            error.quantityRequired = 'Please enter valid quantity';
        }
        if (!maxPrice) {
            formIsValid = false;
            error.maxPrice = 'Price can not be empty';
        } else if (maxPrice < 0) {
            formIsValid = false;
            error.maxPrice = 'Please enter valid price';
        }

        this.setState({ errors: error });
        return formIsValid;
    }
    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ isButtonDisabled: true }); 

        if (this.handleValidation()) {
            this.setState({ isButtonDisabled: true });
            const data = {
                name: this.state.name,
                short_description: this.state.description,
                date_time: this.state.datetime,
                item_state: this.state.itemState,
                months_old: this.state.monthsOld,
                quantity_required: this.state.quantityRequired,
                max_price: this.state.maxPrice,
                more_info: this.state.moreInfo,
                item_status: 1,
            };
            const { postRequestAction, history } = this.props;
            const response = await postRequestAction(data);
            if (response === true) {
                history.push('/home');
            } else {
                const { date_time: datetime, name, short_description: description, item_state: itemState, months_old: monthsOld, quantity_required: quantityRequired, max_price: maxPrice } = response;
                const error = { datetime, name, description, itemState, monthsOld, quantityRequired, maxPrice };
                this.setState({ isButtonDisabled: false, errors: error });
            }       
        }
        this.setState({ isButtonDisabled: false }); 
    }
    

    render() {
        return (
            <div>
                <div className="content">
                    <h1>Request Item</h1>
                    <div className="form-center">
                        <form onSubmit={this.handleSubmit} className="form-fields">
                            <div className="form-field">
                                <label className="form-field-label" htmlFor="name">Name</label>
                                <input type="text" id="name" className="form-field-input" placeholder="Enter name of item" name="name" onChange={this.handleChange} />
                                <div className="form-field-label error-block">{this.state.errors.name}</div>
                            </div>
                            <div className="form-field">
                                <label className="form-field-label" htmlFor="description">Description</label>
                                <input type="text" id="description" className="form-field-input" placeholder="Enter description of required item" name="description" onChange={this.handleChange} />
                                <div className="form-field-label error-block">{this.state.errors.description}</div>
                            </div>
                            <div className="form-field">
                                <label className="form-field-label" htmlFor="datetime">Date and Time</label>
                                <input type="datetime-local" id="datetime" className="form-field-input" placeholder="Enter date and time" name="datetime" onChange={this.handleChange} />
                                <div className="form-field-label error-block">{this.state.errors.datetime}</div>
                            </div>
                            <div className="form-field">
                                <label className="form-field-label" htmlFor="itemState">Item State</label>
                                <select className="form-field-input" name="itemState" onChange={this.handleChange}>
                                    <option className="drop-down-text" selected value={3}>Old</option>
                                    <option className="drop-down-text" value={2} >Second Hand</option>
                                    <option className="drop-down-text" value={1} >New</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <label className="form-field-label" htmlFor="monthsOld">Months Old</label>
                                <input type="number" id="monthsOld" className="form-field-input" placeholder="Enter quantity required" name="monthsOld" onChange={this.handleChange} />
                                <div className="form-field-label error-block">{this.state.errors.monthsOld}</div>
                            </div>
                            <div className="form-field">
                                <label className="form-field-label" htmlFor="quantityRequired">Quantity Required</label>
                                <input type="number" id="quantityRequired" className="form-field-input" placeholder="Enter quantity required" name="quantityRequired" onChange={this.handleChange} />
                                <div className="form-field-label error-block">{this.state.errors.quantityRequired}</div>
                            </div>
                            <div className="form-field">
                                <label className="form-field-label" htmlFor="maxPrice">Max Price</label>
                                <input type="number" id="maxPrice" className="form-field-input" placeholder="Enter max price" name="maxPrice" onChange={this.handleChange} />
                                <div className="form-field-label error-block">{this.state.errors.maxPrice}</div>
                            </div>
                            <div className="form-field">
                                <label className="form-field-label" htmlFor="moreInfo">More Information</label>
                                <input type="text" id="moreInfo" className="form-field-input" placeholder="Enter more specification for the item" name="moreInfo" onChange={this.handleChange} />
                            </div>
                            <div className="form-field">
                                <button className="form-field-button mr-20" disabled={this.state.isButtonDisabled}>Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.requestItem.errors,
});

export default connect(mapStateToProps, { postRequestAction })(RequestItem);
