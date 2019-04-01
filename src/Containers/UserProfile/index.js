import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { fetchProfileAction } from '../../Actions/UserActions';
import Profile from '../../Components/User/Profile';

class UserProfile extends Component {
    componentDidMount() {
        this.props.fetchProfileAction();
    }

    render() {  
        const { userdata } = this.props; 
        if (!this.props.isLoading && userdata) {
            return (
                <div>
                    <Profile key={this.props.userdata.id} data={this.props.userdata} />
                </div>         
            );  
        }    
        return <div className="loader-main"><Loader type="Grid" color="#somecolor" height={80} width={80} /></div>;  
    }
}

UserProfile.protoType = {
    userdata: PropTypes.object,
};

UserProfile.defaultProps = {
    userdata: {},
    isLoading: true,
};

const mapStateToProps = state => ({
    userdata: state.auth.user,
    isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { fetchProfileAction })(UserProfile);

