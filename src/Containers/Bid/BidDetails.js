import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { bidDetails, updateBidValidity, deleteBid } from '../../Actions/BidActions';
import BidDetail from '../../Components/Bid/BidDetails';
import '../../App.css';
import Forbidden from '../../Components/Forbidden';
import { RequestItemConstants } from '../../Constants';

class BidDetails extends Component {
    constructor() {
        super();
        this.state = {
            isvalid: 2,
            error: '',
        };
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        const { bidDetails } = this.props;
        bidDetails(id);
    }

    componentWillReceiveProps(nextprop) {
        this.setState({ isvalid: nextprop.bid.validity });
    }
    
    handleDelete = async (e) => {
        e.preventDefault();
        const { id } = this.props.match.params;
        const { history, deleteBid } = this.props;
        const response = await deleteBid(id);
        if (response === true) {
            history.push('/home/my-bids');
        }
    }
    handleUpdate = async (e) => {
        e.preventDefault();
        const { id } = this.props.match.params;
        const { history } = this.props;
        history.push(`/home/bid/${id}/update-price`);        
    }
    handleInvalid = async (e) => {
        e.preventDefault();
        const { id } = this.props.match.params;
        const response = await updateBidValidity({ validity: 2 }, id);
        if (response === true) {
            this.setState({ isvalid: 2, error: null });
            return;
        }
        this.setState({ error: 'Something went Wrong' });
    }
    handleValid = async (e) => {
        e.preventDefault();
        const { id } = this.props.match.params;
        const response = await updateBidValidity({ validity: 1 }, id);
        if (response === true) {
            this.setState({ isvalid: 1, error: null });
            return;
        }
        this.setState({ error: 'Something went Wrong' });
    }


    render() {
        if (!this.props.isLoading && this.props.bid.id !== undefined) {
            const { bid } = this.props;
            return (
                <div>
                    {this.state.error}
                    {bid.flag &&
                    <div className="content">
                        <Link to={'/home/request/' + bid.item.id + '/bids'}>&larr; ALL BIDS </Link>
                        <br />
                        <Link to={'/home/request/' + bid.item.id}>&larr; REQUEST DETAILS</Link>
                    </div>} 
                    <BidDetail key={bid.id} data={bid} />
                    {!bid.flag && bid.item.item_status === RequestItemConstants.LIVE &&
                    <div className="content">
                        <h3>STATUS : Item Request is Live.You can update or delete your bid.</h3>
                    </div>}
                    {!bid.flag && bid.item.item_status === RequestItemConstants.ONHOLD &&
                    <div className="content">
                        <h3>STATUS : Item Requester is reviewing the bids.Expected to receive result soon</h3>
                    </div>}
                    {!bid.flag && bid.item.item_status === RequestItemConstants.LIVE &&
                    <div className="form-field clearfix"><button className="form-field-button " onClick={this.handleUpdate}>Update Price</button>
                    </div>}
                    {!bid.flag && bid.item.item_status === RequestItemConstants.LIVE &&
                    <div className="form-field clearfix"><button className="form-field-button " onClick={this.handleDelete}>Delete</button>
                    </div>}
                    {bid.flag && (bid.item.item_status === RequestItemConstants.ONHOLD || bid.item.item_status === RequestItemConstants.LIVE) && this.state.isvalid === 1 &&
                    <div className="form-field clearfix"><button className="form-field-button button-red" onClick={this.handleInvalid}>Mark Invalid</button> 
                    </div>}
                    {bid.flag && (bid.item.item_status === RequestItemConstants.ONHOLD || bid.item.item_status === RequestItemConstants.LIVE) && this.state.isvalid === 2 &&
                    <div className="form-field clearfix"><button className="form-field-button button-green" onClick={this.handleValid}>Mark Valid</button>
                    </div>}
                    {!bid.flag && (bid.item.item_status === RequestItemConstants.SOLD || bid.item.item_status === RequestItemConstants.UNSOLD) && this.state.isvalid === 3 &&
                    <div className="content">
                        <h3 className="congrats">STATUS :You won the best bid </h3>
                        <h3>Requester Phone Number : {bid.item.requester.phone_number}</h3>
                        <h3>Requester Email : {bid.item.requester.email}</h3>
                    </div>}
                    {!bid.flag && (bid.item.item_status === RequestItemConstants.SOLD || bid.item.item_status === RequestItemConstants.UNSOLD) && this.state.isvalid !== 3 &&
                    <div className="content">
                        <h3 className="unsold">STATUS : Your bid was not selected</h3>
                        <p>Note-Your bidding fees will be refunded after 2 hours from the bid closing time.</p>
                    </div>}
                </div>
            );
        } else if (!this.props.isLoading && this.props.error === 'forbidden') {
            return <Forbidden />;
        }
        return <div className="loader-main"><Loader type="Grid" color="#somecolor" height={80} width={80} /></div>;
    }
}

BidDetails.propType = {
    bid: PropTypes.object,
};

BidDetails.defaultProps = {
    isLoading: true,
    bid: {},
};

const mapStateToProps = state => ({
    bid: state.bid.data,
    isLoading: state.bid.isLoading,
    error: state.bid.errors,
});

export default connect(mapStateToProps, { bidDetails, deleteBid })(BidDetails);

