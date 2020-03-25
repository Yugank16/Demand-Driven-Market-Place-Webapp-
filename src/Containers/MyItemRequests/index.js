import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import queryString from 'query-string';
import moment from 'moment';
import { fetchMyRequestsAction } from '../../Actions/RequestItemActions';
import RequestItem from '../../Components/RequestItem';
import '../../App.css';
import { RequestItemConstants, ItemStatus } from '../../Constants';
import Forbidden from '../../Components/Forbidden';

class MyItemRequestList extends Component {
    constructor(props) {
        super(props);

        const url = this.props.location.search;
        const params = queryString.parse(url);
        this.state = {
            nameParam: params.name,
            itemStatus: params.item_status,
            orderBy: params.ordering,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { nameParam, itemStatus, orderBy: ordering } = this.state; 
        this.props.fetchMyRequestsAction(nameParam, itemStatus || RequestItemConstants.ALL, ordering);
    }

    makeRequest = () => {
        const { nameParam, itemStatus, orderBy: ordering } = this.state;
        this.props.fetchMyRequestsAction(nameParam, itemStatus, ordering);
        this.props.history.push({            
            search: (nameParam ? `?name=${nameParam}&` : '') + (itemStatus ? `item_status=${itemStatus}&` : '') + (ordering ? `ordering=${ordering}` : ''),
        });
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }
    handleDropChange= (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value }, this.makeRequest);
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.makeRequest();
    }
    handleClear = (e) => {
        e.preventDefault();
        this.setState({ nameParam: '' });        
    }

    render() {
        const NO_RESULT_MESSAGE = 'Sorry ! No Request Found.';
    
        if (!this.props.isLoading && !this.props.error) {
            let data = <div className="no-results">{NO_RESULT_MESSAGE}</div>;
            if (this.props.items.length !== 0) {
                data = this.props.items.map((data) => (
                    <LinkContainer key={data.id} to={'/home/request/' + data.id}>
                        <div className="item-card clearfix" >
                            <div className="item-name" >{data.name}</div>  
                            <div className="item-requester">{ItemStatus[data.item_status]}</div>
                            <div className="item-price">&#8377; {data.max_price}</div>
                            <div className="item-required-time"> {moment(data.date_time).format('llll')}</div>
                        </div>
                    </LinkContainer>
                ));
            }
            return (
                <div>
                    <div className="search-bar">
                        <input type="text" id="name" className="search-item-input" placeholder="Search by name" name="nameParam" value={this.state.nameParam} onChange={this.handleChange} />
                        <button type="button" className="item-search-button" onClick={this.handleSearch} >Search</button>
                        <button type="button" className="item-search-button" onClick={this.handleClear} >Clear</button>
                        <select className="item-status-drop" name="itemStatus" value={this.state.itemStatus || RequestItemConstants.ALL} onChange={this.handleDropChange}>
                            <option className="drop-down-text" value="" > All Items</option>
                            <option className="drop-down-text" value="2" > Live</option>
                            <option className="drop-down-text" value="1" > Pending</option>
                            <option className="drop-down-text" value="3" > On hold</option>
                            <option className="drop-down-text" value="4" > Sold</option>
                            <option className="drop-down-text" value="5" > Unsold</option>
                            
                        </select>
                        <select className="order-price-drop" name="orderBy" value={this.state.orderBy} onChange={this.handleDropChange}>
                            <option className="drop-down-text" value="" >No Sorting</option>
                            <option className="drop-down-text" value="max_price">Price Increasing</option>
                            <option className="drop-down-text" value="-max_price" >Price Decreasing</option>
                            <option className="drop-down-text" value="date_time">Increasing Date Time</option>
                            <option className="drop-down-text" value="-date_time" >Decreasing Date Time</option>
                        </select>
                    </div>
                    <RequestItem data={data} />
                    
                </div>
            ); 
        } else if (this.props.error === 'forbidden') {
            return <Forbidden />;
        }
        return <div className="loader-main"><Loader type="Grid" height={80} width={80} /></div>;
    }
}

MyItemRequestList.defaultProps = {
    isLoading: true,
    items: [],
};

MyItemRequestList.propTypes = {
    isLoading: PropTypes.bool,
    items: PropTypes.array,
};

const mapStateToProps = state => ({
    items: state.requestItem.items,
    error: state.requestItem.errors,
    isLoading: state.requestItem.isLoading,
});

export default connect(mapStateToProps, { fetchMyRequestsAction })(MyItemRequestList);
