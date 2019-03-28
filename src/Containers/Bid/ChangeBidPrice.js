import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { bidDetails, updateBidPrice } from '../../Actions/BidActions';
import '../../App.css';
import Forbidden from '../../Components/Forbidden';

class ChangeBidPrice extends Component {
    constructor() {
        super();
        this.state = {
            price: '',
            errors: {},
        };
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        const { bidDetails } = this.props;
        bidDetails(id);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({ errors: { ...this.state.errors, [e.target.name]: null } });
    }
    handleValidation = () => {
        let formIsValid = true;
        const error = {};
        const { price } = this.state;
        const patternPrice = new RegExp(/^\d+$/);
        if (price < 0 || !price || !patternPrice.test(price)) {
            formIsValid = false;
            error.price = 'Enter valid price';
        }
        this.setState({ errors: error });
        return formIsValid;
    }

    handleSubmit = async (e) => {
        console.log('hi');
        e.preventDefault();
        this.setState({ isButtonDisabled: true }); 

        if (this.handleValidation()) {
            const data = {
                bid_price: this.state.price,
            };
            const { id } = this.props.match.params;
            const { history } = this.props;
            const response = await updateBidPrice(data, id);
        
            if (response === true) {
                history.push(`/home/bid/${id}`);
            } else {
                const { bid_price: price } = response;
                const error = { price };
                this.setState({ isButtonDisabled: false, errors: error });
            }       
        }
        this.setState({ isButtonDisabled: false }); 
    }

    render() {
        if (this.props.bid.id !== undefined && !this.props.bid.flag && this.props.bid.item.item_status === 2) {
            const { bid } = this.props;
            return (
                <div className="content">
                    <h2>Update Bid Price</h2>
                    <h3>Ask Price By Requester : {bid.item.max_price}</h3>
                    <h3>Previous Price : {bid.bid_price}</h3>
                    <div className="clearfix">
                        <div className="form-field-price">
                            <label className="form-field-label" htmlFor="price">New Price</label>
                            <input type="text" id="price" className="form-field-input" placeholder="Enter new price" name="price" onChange={this.handleChange} />
                            <div className="form-field-label error-block">{this.state.errors.price}</div>
                        </div>
                        <div className="form-field clearfix"><button className="form-field-button " onClick={this.handleSubmit} disabled={this.state.isButtonDisabled}>Update</button> </div>
                    </div>
                </div>
            );
        } else if (this.props.error === 'forbidden' || this.props.bid.flag) {
            return <Forbidden />;
        }
        return <div className="loader-main"><Loader type="Grid" color="#somecolor" height={80} width={80} /></div>;
    }
}

ChangeBidPrice.propType = {
    bid: PropTypes.object,
};

ChangeBidPrice.defaultProps = {
    bid: {},
};

const mapStateToProps = state => ({
    bid: state.bid.data,
    error: state.bid.errors,
});

export default connect(mapStateToProps, { bidDetails })(ChangeBidPrice);
