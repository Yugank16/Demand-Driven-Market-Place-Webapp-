import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../Actions/RequestItemActions';
import RequestItem from '../../Components/RequestItem';
import "../../App.css"; 

class RequestItemList extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        if (this.props.items[0]) {
            const data = this.props.items.map((data) => (
                <tr>
                    <td>{data.name}</td>
                    <td>{data.max_price}</td>
                    <td>{data.requester.first_name}</td>
                    <td>Sell</td>
                </tr>
            ));
            return (
                <div>
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

export default connect(mapStateToProps, { fetchPosts })(RequestItemList);

