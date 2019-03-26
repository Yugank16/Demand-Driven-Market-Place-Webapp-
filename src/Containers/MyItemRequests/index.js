import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import queryString from 'query-string';
import { fetchMyRequestsAction } from '../../Actions/RequestItemActions';
import RequestItem from '../../Components/RequestItem';
import '../../App.css';

class MyItemRequestList extends Component {
    constructor() {
        super();

        this.state = {
            nameParam: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search); 
        this.props.fetchMyRequestsAction(values.name);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSearch = (e) => {
        const { nameParam } = this.state;
        this.props.fetchMyRequestsAction(nameParam);
        this.props.history.push({            
            search: nameParam ? `?name=${nameParam}` : '',
        });
    }
    handleClear = (e) => {
        this.setState({ nameParam: '' });        
    }

    render() {
        const NO_RESULT_MESSAGE = 'Sorry ! No Request Found.';
    
        if (!this.props.isLoading) {
            let data = <div className="no-results">{NO_RESULT_MESSAGE}</div>;
            if (this.props.items.length !== 0) {
                data = this.props.items.map((data) => (
                    <LinkContainer key={data.id} to={'/home/request/' + data.id}>
                        <div className="item-card clearfix" >
                            <div className="item-name" >{data.name}</div>
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
    isLoading: state.requestItem.isLoading,
});

export default connect(mapStateToProps, { fetchMyRequestsAction })(MyItemRequestList);
