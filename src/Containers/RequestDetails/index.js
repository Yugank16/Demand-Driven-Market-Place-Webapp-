import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDetailsAction } from '../../Actions/RequestItemActions';
import RequestDetail from '../../Components/RequestDetails';
import "../../App.css"; 

class RequestDetails extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        const { fetchDetailsAction } = this.props;
        fetchDetailsAction(id);
    }

    render() {
        if (this.props.item) {
            return (
                <div>
                    <RequestDetail data={this.props.items} />
                </div>         
            );  
        }    
        return <div>Please wait.....</div>;             
    }
}

const mapStateToProps = state => ({
    item: state.requestItem.data,
});

export default connect(mapStateToProps, { fetchDetailsAction })(RequestDetails);

