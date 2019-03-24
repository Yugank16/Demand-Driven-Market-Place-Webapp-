import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { fetchRequestsAction, loadingTrueAction, loadingFalseAction } from '../../Actions/RequestItemActions';
import RequestItem from '../../Components/RequestItem';
import '../../App.css';

class RequestItemList extends Component {
    constructor() {
        super();

        this.state = {
            nameParam: '',
            itemStatus: '2',
            orderBy: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        loadingTrueAction();
        const { nameParam, itemStatus, orderBy: ordering } = this.state; 
        this.props.fetchRequestsAction(nameParam, itemStatus, ordering);
    }

    makeRequest = () => {
        const { nameParam, itemStatus, orderBy: ordering } = this.state;
        this.props.fetchRequestsAction(nameParam, itemStatus, ordering);
        this.props.history.push({            
            search: `?name=${nameParam}&item_status=${itemStatus}&ordering=${ordering}`,
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
        const NO_RESULT_MESSAGE = 'Sorry ! No results were found.';
    
        if (!this.props.isLoading) {
            let data = <div className="no-results">{NO_RESULT_MESSAGE}</div>;
            if (this.props.items.length !== 0) {
                data = this.props.items.map((data) => (
                    <LinkContainer key={data.id} to={'/home/request/' + data.id}>
                        <div className="item-card clearfix" >
                            <div className="item-name" >{data.name}</div>
                            <div className="item-price">&#8377; {data.max_price}</div>
                            <div className="item-requester">{data.requester.first_name}</div>
                            <div className="item-required-time"> {data.date_time}</div>
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
                        <select className="item-status-drop" name="itemStatus" value={this.state.itemStatus} onChange={this.handleDropChange}>
                            <option className="drop_down_text" value="2">Live</option>
                            <option className="drop_down_text" value="1" > Pending</option>
                        </select>
                        <select className="order-price-drop" name="orderBy" value={this.state.orderBy} onChange={this.handleDropChange}>
                            <option className="drop_down_text" value="" >No Filter</option>
                            <option className="drop_down_text" value="max_price">Price Increasing</option>
                            <option className="drop_down_text" value="-max_price" >Price Decreasing</option>
                            <option className="drop_down_text" value="date_time">Increasing Date Time</option>
                            <option className="drop_down_text" value="-date_time" >Decreasing Date Time</option>
                        </select>
                    </div>
                    <RequestItem data={data} />
                    
                </div>
            ); 
        }
        return <div className="loader-main"><Loader type="Grid" color="#somecolor" height={80} width={80} /></div>;
    }
}

RequestItemList.defaultProps = {
    isLoading: true,
    items: [],
};
RequestItemList.propTypes = {
    isLoading: PropTypes.bool,
    items: PropTypes.array,
};

const mapStateToProps = state => ({
    items: state.requestItem.items,
    isLoading: state.requestItem.isLoading,
});

export default connect(mapStateToProps, { fetchRequestsAction })(RequestItemList);
