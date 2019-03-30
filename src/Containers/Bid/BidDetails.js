import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { bidDetails, updateBidValidity, deleteBid } from '../../Actions/BidActions';
import BidDetail from '../../Components/Bid/BidDetails';
import '../../App.css';
import Forbidden from '../../Components/Forbidden';

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
            return;
        }
        this.setState({ error: 'Something went Wrong' });
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
        if (this.props.bid.id !== undefined) {
            console.log(this.props.bid);
            const { bid } = this.props;
            console.log(this.props.bid.flag);
            return (
                <div>
                    {this.state.error}
                    <BidDetail key={bid.id} data={bid} />
                    {!bid.flag && bid.item.item_status === 2 && <div className="form-field clearfix"><button className="form-field-button " onClick={this.handleUpdate}>Update Price</button> </div>
                    }
                    {!bid.flag && bid.item.item_status === 2 && <div className="form-field clearfix"><button className="form-field-button " onClick={this.handleDelete}>Delete</button> </div>
                    }
                    {bid.flag && bid.item.item_status === 3 && this.state.isvalid === 1 && <div className="form-field clearfix"><button className="form-field-button button-red" onClick={this.handleInvalid}>Mark Invalid</button> </div>
                    }
                    {bid.flag && bid.item.item_status === 3 && this.state.isvalid === 2 && <div className="form-field clearfix"><button className="form-field-button button-green" onClick={this.handleValid}>Mark Valid</button> </div>
                    }
                </div>
            );
        } else if (this.props.error === 'forbidden') {
            return <Forbidden />;
        }
        return <div className="loader-main"><Loader type="Grid" color="#somecolor" height={80} width={80} /></div>;
    }
}

BidDetails.propType = {
    bid: PropTypes.object,
};

BidDetails.defaultProps = {
    bid: {},
};

const mapStateToProps = state => ({
    bid: state.bid.data,
    isLoading: state.bid.isLoading,
    error: state.bid.errors,
});

export default connect(mapStateToProps, { bidDetails, deleteBid })(BidDetails);

