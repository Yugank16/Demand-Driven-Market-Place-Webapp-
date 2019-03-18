import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRequestsAction } from '../../Actions/RequestItemActions';
import RequestItem from '../../Components/RequestItem';
import '../../App.css';

class RequestItemList extends Component {
    componentDidMount() {
        this.props.fetchRequestsAction();
    }

    render() {
        if (this.props.items[0]) {
            const data = this.props.items.map((data) => (
                <div key={data.id} className="item-card clearfix">
                    <div className="item-name" >{data.name}</div>
                    <div className="item-price">{data.max_price}</div>
                    <div className="item-requester">{data.requester.first_name}</div>
                    <div className="item-required-time"> 6:00 pm , 12 August 2019</div>
                    {/* <div><Link to={'/home/request-details/' + data.id}>sell</Link></td> */}
                </div>
            ));
            return (
                <div>
                    <input type="text" id="name" className="search-item-input" placeholder="Search by name" name="name" onChange={this.handleChange} />
                    <RequestItem data={data} />
                </div>
            );
        }
        return <div>Please wait.....</div>;
    }
}

const mapStateToProps = state => ({
    items: state.requestItem.data,
});

export default connect(mapStateToProps, { fetchRequestsAction })(RequestItemList);
