import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from 'react-loader-spinner';
import queryString from 'query-string';
import { fetchRequestsAction, loadingTrueAction, loadingFalseAction } from '../../Actions/RequestItemActions';
import RequestItem from '../../Components/RequestItem';
import '../../App.css';

class RequestItemList extends Component {
    constructor() {
        super();

        this.state = {
            nameParam: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        loadingTrueAction();
    }

    componentDidMount() {
        loadingTrueAction();
        const values = queryString.parse(this.props.location.search); 
        this.props.fetchRequestsAction(values.name);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSearch = (e) => {
        const { nameParam } = this.state;
        this.props.fetchRequestsAction(nameParam);
        this.props.history.push({            
            search: nameParam ? `?name=${nameParam}` : '',
        });
    }
    handleClear = (e) => {
        this.setState({ nameParam: '' });        
    }

    render() {
        const NO_RESULT_MESSAGE = 'Sorry ! No results were found.';
    
        if (!this.props.isLoading) {
            let data = <div className="no-results">{NO_RESULT_MESSAGE}</div>;
            if (this.props.items.length !== 0) {
                data = this.props.items.map((data) => (
                    <LinkContainer key={data.id} to={'/home/request-details/' + data.id}>
                        <div className="item-card clearfix" >
                            <div className="item-name" >{data.name}</div>
                            <div className="item-price">&#8377; {data.max_price}</div>
                            <div className="item-requester">{data.requester.first_name}</div>
                            <div className="item-required-time"> 6:00 pm , 12 August 2019</div>
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

const mapStateToProps = state => ({
    items: state.requestItem.items,
    isLoading: state.requestItem.isLoading,
});

export default connect(mapStateToProps, { fetchRequestsAction })(RequestItemList);
