import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bidDetails } from '../../Actions/BidActions';
import BidDetail from '../../Components/Bid/BidDetails';
import '../../App.css';

class BidDetails extends Component {  
    componentDidMount() {
        const { id } = this.props.match.params;
        const { bidDetails } = this.props;
        bidDetails(id);
    }

    render() {
        console.log(this.props);
        if (this.props.bid.id) {
            console.log(this.props.bid);
            return (
                <div>
                    <BidDetail key={this.props.bid.id} data={this.props.bid} />
                </div>
            );
        }
        return <div>Please wait.....</div>;
    }
}

BidDetails.propType = {
    bid: PropTypes.object,
};

const mapStateToProps = state => ({
    bid: state.bid.data,
});

export default connect(mapStateToProps, { bidDetails })(BidDetails);

