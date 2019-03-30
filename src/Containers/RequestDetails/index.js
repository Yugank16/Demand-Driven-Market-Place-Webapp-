import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { fetchDetailsAction, deleteItemAction } from '../../Actions/RequestItemActions';
import RequestDetail from '../../Components/RequestDetails';
import '../../App.css';
import Forbidden from '../../Components/Forbidden';

class RequestDetails extends Component {
    constructor() {
        super();
        this.state = {
            minPrice: '',
        };
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        const { fetchDetailsAction } = this.props; 
        fetchDetailsAction(id);
        this.connection = new WebSocket(`ws://localhost:8000/ws/${id}/`);
        console.log(this.connection);
        this.connection.onmessage = evt => {
            const responseData = JSON.parse(evt.data);
            this.setState({ minPrice: responseData.min_price });
        };
    }
    handleBid = (e) => {
        e.preventDefault();
        const { history } = this.props;
        const { id } = this.props.match.params;
        history.push(`/home/request/${id}/bid`);
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
    handleView = (e) => {
        e.preventDefault();
        const { history } = this.props;
        const { id } = this.props.match.params;
        history.push(`/home/request/${id}/bids`);
    }
    handleDetail = (e) => {
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


    render() {
        if (this.props.item.id !== undefined && !this.props.isLoading) {
            const datetime = new Date(this.props.item.date_time);
            const time = datetime.toISOString().slice(12, 16);
            const date = datetime.toISOString().slice(0, 10);
            const minBidPrice = this.props.item.min_bid_price ? this.props.item.min_bid_price : "No Bid Yet";
            return (
                <div>
                    <RequestDetail key={this.props.item.id} data={this.props.item} date={date} time={time} />
                    <div className="live-bid">
                        <h3>Currently Lowest bid:{this.state.minPrice ? this.state.minPrice : minBidPrice}</h3>
                    </div>
                    {!this.props.item.flag && !this.props.item.bidId && this.props.item.item_status === 2 && <div className="form-field clearfix"><button className="form-field-button" onClick={this.handleBid} >Bid Now</button> </div>
                    }
                    {!this.props.item.flag && this.props.item.bidId && this.props.item.item_status === 2 && <div className="form-field clearfix"><Link className="form-field-button" to={`/home/bid/` + this.props.item.bidId}>View Bid</Link> </div>
                    }
                    {!this.props.item.flag && this.props.item.bidId && this.props.item.item_status === 2 && <div className="form-field clearfix"><Link className="form-field-button" to={`/home/bid/` + this.props.item.bidId + '/update-price'} >Update Bid</Link> </div>
                    }
                    {this.props.item.flag && this.props.item.item_status === 1 && <div className="form-field clearfix"><button className="form-field-button " onClick={this.handleDelete}>Delete</button> </div>
                    }
                    {this.props.item.flag && (this.props.item.item_status === 2 || this.props.item.item_status === 3) && <div className="form-field clearfix"><button className="form-field-button item-button" onClick={this.handleView}>View Bids</button> </div>
                    }
                    {this.props.item.flag && this.props.item.item_status === 3 && <div className="form-field clearfix"><button className="form-field-button item-button" >Close Bid</button> </div>
                    }
                </div>
            );
        } else if (this.props.error === 'forbidden') {
            return <Forbidden />;
        }
        return <div className="loader-main"><Loader type="Grid" color="#somecolor" height={80} width={80} /></div>;
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
    isLoading: state.requestItem.isLoading,
});

export default connect(mapStateToProps, { fetchDetailsAction, deleteItemAction })(RequestDetails);

