import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { postRequestAction } from '../../Actions/RequestItemActions';
import { fetchProfileAction } from '../../Actions/UserActions';
import '../../App.css';
import StripePayment from '../Stripe';
import Forbidden from '../../Components/Forbidden';
import { RequestItemConstants, UserConstants } from '../../Constants';

class RequestItem extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            description: '',
            datetime: '',
            itemState: RequestItemConstants.NEW,
            monthsOld: null,
            quantityRequired: '',
            maxPrice: '',
            moreInfo: '',
            isButtonDisabled: true,
            errors: {},
            show: false,
            token: '',
        };
    }
    componentDidMount() {
        const { fetchProfileAction } = this.props;
        fetchProfileAction();
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    updateToken = tokenId => {
        this.setState({ token: tokenId, isButtonDisabled: false });
        this.handleClose();
    }
    
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({ errors: { ...this.state.errors, [e.target.name]: null } });
    }

    handleValidation = () => {
        const { name, description, datetime, itemState, monthsOld, quantityRequired, maxPrice } = this.state;
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
        if (itemState !== RequestItemConstants.NEW && !monthsOld) {
            formIsValid = false;
            error.monthsOld = 'Months can not be empty';
        } else if (monthsOld < 0) {
            formIsValid = false;
            error.monthsOld = 'Please enter valid input';
        }
        if (!quantityRequired || quantityRequired <= 0 || quantityRequired > 1000) {
            formIsValid = false;
            error.quantityRequired = 'Please enter valid quantity between 0-1000';
        }
        if (!maxPrice || maxPrice <= 0) {
            formIsValid = false;
            error.maxPrice = 'Please enter valid price';
        }

        this.setState({ errors: error });
        return formIsValid;
    }

    handleSubmit = async (e) => {
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
                payment_token: this.state.token };
            const { postRequestAction, history } = this.props;
            const response = await postRequestAction(data);
            if (response === true) {
                history.push('/home/my-requests');
            } else {
                const { date_time: datetime, name, short_description: description, item_state: itemState, months_old: monthsOld, quantity_required: quantityRequired, max_price: maxPrice } = response;
                const error = { datetime, name, description, itemState, monthsOld, quantityRequired, maxPrice };
                this.setState({ isButtonDisabled: false, errors: error });
            }
        }
        this.setState({ isButtonDisabled: false });
    }


    render() {
        const PAYMENT_INFO = '**One percent of the maximum price of your requested item or one dollar (whichever is maximum) will be deducted from your account. Please forward with filling your payment details';
        if (this.props.data.user_type !== UserConstants.SELLER && !this.props.isLoading) {
            return (
                <div>
                    <div className="content">
                        <h1>Request Item</h1>
                        <h6> Fields marked with * are required</h6>
                        <div className="form-center">
                            <form onSubmit={this.handleSubmit} className="form-fields">
                                <div className="form-field">
                                    <label className="form-field-label" htmlFor="name">Name*</label>
                                    <input type="text" id="name" className="form-field-input" placeholder="Enter name of item" name="name" onChange={this.handleChange} />
                                    <div className="form-field-label error-block">{this.state.errors.name}</div>
                                </div>
                                <div className="form-field">
                                    <label className="form-field-label" htmlFor="description">Description*</label>
                                    <input type="text" id="description" className="form-field-input" placeholder="Enter description of required item" name="description" onChange={this.handleChange} />
                                    <div className="form-field-label error-block">{this.state.errors.description}</div>
                                </div>
                                <div className="form-field">
                                    <label className="form-field-label" htmlFor="datetime">Date and Time*</label>
                                    <input type="datetime-local" id="datetime" className="form-field-input" placeholder="Enter date and time" name="datetime" onChange={this.handleChange} />
                                    <div className="form-field-label error-block">{this.state.errors.datetime}</div>
                                </div>
                                <div className="form-field">
                                    <label className="form-field-label" htmlFor="itemState">Item State*</label>
                                    <select className="form-field-input" name="itemState" value={this.state.itemState} onChange={this.handleChange}>
                                        <option className="drop-down-text" value={RequestItemConstants.OLD}>Old</option>
                                        <option className="drop-down-text" value={RequestItemConstants.SECOND_HAND} >Second Hand</option>
                                        <option className="drop-down-text" value={RequestItemConstants.NEW} >New</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label className="form-field-label" htmlFor="monthsOld">Months Old*</label>
                                    <input type="number" id="monthsOld" className="form-field-input" placeholder="Enter quantity required" name="monthsOld" onChange={this.handleChange} />
                                    <div className="form-field-label error-block">{this.state.errors.monthsOld}</div>
                                </div>

                                <div className="form-field">
                                    <label className="form-field-label" htmlFor="quantityRequired">Quantity Required*</label>
                                    <input type="number" id="quantityRequired" className="form-field-input" placeholder="Enter quantity required" name="quantityRequired" onChange={this.handleChange} />
                                    <div className="form-field-label error-block">{this.state.errors.quantityRequired}</div>
                                </div>
                                <div className="form-field">
                                    <label className="form-field-label" htmlFor="maxPrice">Maximum Price*</label>
                                    <input type="number" id="maxPrice" className="form-field-input" placeholder="Enter max price" name="maxPrice" onChange={this.handleChange} />
                                    <div className="form-field-label error-block">{this.state.errors.maxPrice}</div>
                                </div>
                                <div className="form-field">
                                    <label className="form-field-label" htmlFor="moreInfo">More Information</label>
                                    <input type="text" id="moreInfo" className="form-field-input" placeholder="Enter more specification for the item" name="moreInfo" onChange={this.handleChange} />
                                </div>
                                <h6> {PAYMENT_INFO} </h6>
                                <Button variant="primary" onClick={this.handleShow}>
                                    UPDATE PAYMENT DETAILS
                                </Button>


                                <div className="form-field">
                                    <Button className="form-field-button mr-20" variant="primary" disabled={this.state.isButtonDisabled} onClick={this.handleSubmit}>
                                        Post
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Modal show={this.state.show} onHide={this.handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>UPDATE PAYMENT DETAILS</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <StripePayment updateToken={this.updateToken} handleClose={this.handleClose} />
                        </Modal.Body>
                    </Modal>
                </div>
            );
        } else if (this.props.data.user_type) {
            return <Forbidden />;
        }
        return <div className="loader-main"><Loader type="Grid" height={80} width={80} /></div>;
    }
}

RequestItem.protoType = {
    error: PropTypes.object,
};

RequestItem.defaultProps = {
    data: {},
    isLoading: true,
};

const mapStateToProps = state => ({
    data: state.auth.user,
    errors: state.requestItem.errors, 
    isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { postRequestAction, fetchProfileAction })(RequestItem);
