import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from 'react-loader-spinner';
import { allBids, loadingTrueAction } from '../../Actions/BidActions';
import RequestItem from '../../Components/RequestItem';
import '../../App.css';
import Forbidden from '../../Components/Forbidden';

class AllBids extends Component {
    componentDidMount() {
        loadingTrueAction();
        const { id } = this.props.match.params;
        const { allBids } = this.props;
        allBids(id);
    }

    render() {
        const NO_RESULT_MESSAGE = 'Sorry ! No Bids.';
    
        if (!this.props.isLoading) {
            let data = <div className="no-results">{NO_RESULT_MESSAGE}</div>;
            if (this.props.bids.length !== 0) {
                console.log(this.props.bids);
                data = this.props.bids.map((data) => (
                    <LinkContainer key={data.id} to={'/home/bid/' + data.id}>
                        <div className="item-card clearfix" >
                            <div className="item-name" >{data.seller.first_name}</div>
                        </div>
                    </LinkContainer>
                ));
            }
            return (
                <div>
                    <RequestItem data={data} />
                </div>
            ); 
        } else if (this.props.error === 'forbidden') {
            return <Forbidden />;
        }
        return <div className="loader-main"><Loader type="Grid" color="#somecolor" height={80} width={80} /></div>;
    }
}

AllBids.defaultProps = {
    isLoading: true,
    bids: [],
};

const mapStateToProps = state => ({
    bids: state.bid.bids,
    isLoading: state.bid.isLoading,
    error: state.bid.errors,
});

export default connect(mapStateToProps, { allBids })(AllBids);
