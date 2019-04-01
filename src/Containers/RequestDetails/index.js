import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { fetchDetailsAction, bidClose, deleteItemAction, updateRequestAction } from '../../Actions/RequestItemActions';

import RequestDetail from '../../Components/RequestDetails';
import '../../App.css';
import Forbidden from '../../Components/Forbidden';
import { RequestItemConstants } from '../../Constants';

class RequestDetails extends Component {
    constructor() {
        super();
        this.state = {
            minPrice: '',
            show: false,
            datetime: '',
            maxPrice: 0,
            errors: {},
            isButtonDisabled: false,
        };
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        const { fetchDetailsAction } = this.props; 
        fetchDetailsAction(id);
        this.connection = new WebSocket(`ws://localhost:8000/ws/${id}/`);
        this.connection.onmessage = evt => {
            const responseData = JSON.parse(evt.data);
            this.setState({ minPrice: responseData.min_price });
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ datetime: nextProps.item.date_time, maxPrice: nextProps.item.max_price });
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }


    handleBid = (e) => {
        e.preventDefault();
        const { history } = this.props;
        const { id } = this.props.match.params;
        history.push(`/home/request/${id}/bid`);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({ errors: { ...this.state.errors, [e.target.name]: null } });
    }

    handleCloseBid = async (e) => {
        e.preventDefault();
        const { id } = this.props.match.params;
        const data = {
            item_status: RequestItemConstants.SOLD };
            
        await this.props.bidClose(data, id);
        if (this.props.close_bid_data.item_status === RequestItemConstants.SOLD || this.props.close_bid_data.item_status === RequestItemConstants.UNSOLD) {
            this.props.fetchDetailsAction(id);
        }
    }

    handleDelete = async (e) => {
        e.preventDefault();
        const { deleteItemAction, history } = this.props;
        const { id } = this.props.match.params;
        const response = await deleteItemAction(id);
        if (response === true) {
            history.push('/home/my-requests');
        }
    }

    handleDetail = (e) => {
        e.preventDefault();
        const { history } = this.props;
        const { id } = this.props.match.params;
        history.push(`/home/request/${id}/bids`);
    }
    
    handleView = (e) => {
        e.preventDefault();
        const { history } = this.props;
        const { id } = this.props.match.params;
        history.push(`/home/request/${id}/bids`);
    }
    
    handleUpdate = (e) => {
        e.preventDefault();
        const { history } = this.props;
        const { id } = this.props.match.params;
        history.push(`/home/request/${id}/bids`);
    }

    handleValidation = () => {
        const { datetime, maxPrice } = this.state;
        const error = {};
        let formIsValid = true;
        
        if (!datetime) {
            formIsValid = false;
            error.datetime = 'Date time can not be empty';
        }
        if (!maxPrice || maxPrice <= 0) {
            formIsValid = false;
            error.maxPrice = 'Please enter valid price';
        }

        this.setState({ errors: error });
        return formIsValid;
    }

    handleItemUpdate = async (e) => {
        e.preventDefault();
        this.setState({ isButtonDisabled: true });
        const { id } = this.props.match.params;

        if (this.handleValidation()) {
            this.setState({ isButtonDisabled: true });
            const data = {
                date_time: this.state.datetime,
                max_price: this.state.maxPrice };
            const { updateRequestAction } = this.props;
            const response = await updateRequestAction(id, data);
            if (response === true) {
                this.props.fetchDetailsAction(id);
                this.handleClose();
            } else {
                const { date_time: datetime, max_price: maxPrice } = response;
                const error = { datetime, maxPrice };
                this.setState({ isButtonDisabled: false, errors: error });
            }
        }
        this.setState({ isButtonDisabled: false });
    }


    render() {
        if (this.props.item.id !== undefined && !this.props.isLoading) {
            const minBidPrice = this.props.item.min_bid_price ? this.props.item.min_bid_price : 'No Bid Yet';
            return (
                <div>
                    <RequestDetail key={this.props.item.id} data={this.props.item} />
                    {this.props.item.item_status === RequestItemConstants.LIVE &&
                    <div className="live-bid"><h3>Currently Lowest bid:{this.state.minPrice ? this.state.minPrice : minBidPrice}</h3>
                    </div>}
                    {this.props.item.item_status === RequestItemConstants.LIVE && !this.props.item.flag && !this.props.item.bidId && 
                    <div className="form-field clearfix"><button className="form-field-button" onClick={this.handleBid} >Bid Now</button> 
                    </div>}
                    {this.props.item.item_status === RequestItemConstants.LIVE && !this.props.item.flag && this.props.item.bidId && 
                    <div className="form-field clearfix">
                        <Link className="form-field-button" to={'/home/bid/' + this.props.item.bidId}>View your Bid</Link> 
                    </div>}
                    {this.props.item.item_status === RequestItemConstants.LIVE && !this.props.item.flag && this.props.item.bidId && 
                    <div className="form-field clearfix"><Link className="form-field-button" to={'/home/bid/' + this.props.item.bidId + '/update-price'} >Update your Bid</Link> </div>}
                    {this.props.item.item_status === RequestItemConstants.PENDING && this.props.item.flag && 
                    <div className="form-field clearfix"><button className="form-field-button " onClick={this.handleDelete}>Delete</button> 
                    </div>}
                    {this.props.item.item_status === RequestItemConstants.PENDING && this.props.item.flag && 
                    <div className="form-field clearfix"><button className="form-field-button " onClick={this.handleShow}>Update</button>
                    </div>}
                    {(this.props.item.item_status === RequestItemConstants.LIVE || this.props.item.item_status === RequestItemConstants.ONHOLD) && this.props.item.flag && 
                    <div className="form-field clearfix"><button className="form-field-button item-button" onClick={this.handleView}>View All Bids</button> 
                    </div>}
                    {this.props.item.item_status === RequestItemConstants.ONHOLD && this.props.item.flag && 
                    <div className="form-field clearfix"><button className="form-field-button item-button" onClick={this.handleCloseBid}>Close Bid</button> 
                    </div>}
                    {this.props.item.item_status === RequestItemConstants.UNSOLD && <div className="content"><h3 className="unsold">Your Item Request did not receive any valid bids</h3></div>} 
                    {this.props.item.item_status === RequestItemConstants.SOLD && 
                    <div className="content">
                        <h3 className="congrats">Congratulations you got a bid for your item request</h3>
                        <h4>Bid Price: {this.props.item.soldbid.bid_price}</h4>
                        <h4>Seller: {this.props.item.soldbid.seller.first_name}</h4>
                        <h4>Phone Number: {this.props.item.soldbid.seller.phone_number}</h4>
                        <h4>Email: {this.props.item.soldbid.seller.email}</h4>
                    </div>}
                    <Modal show={this.state.show} onHide={this.handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Request</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-field">
                                <label className="form-field-label" htmlFor="datetime">Date and Time</label>
                                <input type="datetime-local" id="datetime" className="form-field-input" placeholder="Enter date and time" name="datetime" onChange={this.handleChange} />
                                <div className="form-field-label error-block">{this.state.errors.datetime}</div>
                            </div>
                            <div className="form-field">
                                <label className="form-field-label" htmlFor="maxPrice">Price</label>
                                <input type="number" id="maxPrice" className="form-field-input" value={this.state.maxPrice} placeholder="Enter max price" name="maxPrice" onChange={this.handleChange} />
                                <div className="form-field-label error-block">{this.state.errors.maxPrice}</div>
                            </div>
                            
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.handleItemUpdate} disabled={this.state.isButtonDisabled}>
                                Update Request
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        } else if (this.props.error === 'forbidden') {
            return <Forbidden />;
        }
        return <div className="loader-main"><Loader type="Grid" height={80} width={80} /></div>;
    }
}

RequestDetails.propType = {
    item: PropTypes.object,
    
};

RequestDetails.defaultProps = {
    item: {},
    isLoading: true,
};

const mapStateToProps = state => ({
    item: state.requestItem.data,
    error: state.requestItem.errors,
    close_bid_data: state.requestItem.close_bid_data,
    isLoading: state.requestItem.isLoading,
});

export default connect(mapStateToProps, { fetchDetailsAction, bidClose, deleteItemAction, updateRequestAction })(RequestDetails);
