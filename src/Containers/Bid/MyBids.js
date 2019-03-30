import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { myBids } from '../../Actions/BidActions';
import MyBid from '../../Components/Bid/MyBids';
import '../../App.css';
import Forbidden from '../../Components/Forbidden';

class MyBids extends Component {
    componentDidMount() {
        const { myBids } = this.props;
        myBids();
    }

    render() {
        const NO_RESULT_MESSAGE = 'No Bids Made By You.';
    
        if (!this.props.isLoading && !this.props.error) {
            let data = <div className="no-results">{NO_RESULT_MESSAGE}</div>;
            if (this.props.bids.length !== 0) {
                data = this.props.bids.map((data) => (
                    <LinkContainer key={data.id} to={'/home/bid/' + data.id}>
                        <div className="item-card clearfix" >
                            <div className="item-name" >{data.item.name}</div>
                            <div className="item-requester">&#8377; {data.bid_price}</div>
                            <div className="item-required-time"> {data.date_time}</div>
                        </div>
                    </LinkContainer>
                ));
            }
            return (
                <div className="right">
                    <p>My Bids</p>
                    <MyBid data={data} />
                </div>
            ); 
        } else if (this.props.error === 'forbidden') {
            return <Forbidden />;
        }
        return <div className="loader-main"><Loader type="Grid" color="#somecolor" height={80} width={80} /></div>;
    }
}

MyBids.defaultProps = {
    isLoading: true,
    bids: [],
};

MyBids.propTypes = {
    isLoading: PropTypes.bool,
    bids: PropTypes.array,
};

const mapStateToProps = state => ({
    bids: state.bid.bids,
    error: state.bid.errors,
    isLoading: state.bid.isLoading,
});

export default connect(mapStateToProps, { myBids })(MyBids);
