import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchDetailsAction } from '../../Actions/RequestItemActions';
import RequestDetail from '../../Components/RequestDetails';
import '../../App.css';
import Forbidden from '../../Components/Forbidden';

class RequestDetails extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        const { fetchDetailsAction } = this.props;
        fetchDetailsAction(id);
    }
    handleBid = (e) => {
        e.preventDefault();
        const { history } = this.props;
        const { id } = this.props.match.params;
        history.push(`/home/request/${id}/bid`);
    }
    handleDelete = (e) => {
        e.preventDefault();
        const { history } = this.props;
        history.push('/home/my-requests');
    }
    handleView = (e) => {
        e.preventDefault();
        const { history } = this.props;
        const { id } = this.props.match.params;
        history.push(`/home/request/${id}/bids`);
    }

    render() {
        if (this.props.item.id !== undefined) {
            console.log(this.props.item);
            const datetime = new Date(this.props.item.date_time);
            const time = datetime.toISOString().slice(12, 16);
            const date = datetime.toISOString().slice(0, 10);
            return (
                <div>
                    <RequestDetail key={this.props.item.id} data={this.props.item} date={date} time={time} />
                    {!this.props.item.flag && this.props.item.item_status === 2 && <div className="form-field clearfix"><button className="form-field-button" onClick={this.handleBid} >Bid Now</button> </div>
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
        return <div>Please wait.....</div>;
    }
}

RequestDetails.propType = {
    item: PropTypes.object,
};

RequestDetails.defaultProps = {
    item: {},
};

const mapStateToProps = state => ({
    item: state.requestItem.data,
    error: state.requestItem.errors,
});

export default connect(mapStateToProps, { fetchDetailsAction })(RequestDetails);

