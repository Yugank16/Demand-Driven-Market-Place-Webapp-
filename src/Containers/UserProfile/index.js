import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchProfileAction } from '../../Actions/UserActions';
import Profile from '../../Components/User/Profile';

class UserProfile extends Component {
    componentDidMount() {
        this.props.fetchProfileAction();
    }

    render() {  
        const { userdata } = this.props; 
        if (userdata) {
            return (
                <div>
                    <Profile key={this.props.userdata.id} data={this.props.userdata} />
                </div>         
            );  
        }    
        return <div className="float_right" >Please wait.....</div>;  
    }
}

UserProfile.protoType = {
    userdata: PropTypes.object,
};

const mapStateToProps = state => ({
    userdata: state.auth.user,
});

export default connect(mapStateToProps, { fetchProfileAction })(UserProfile);

