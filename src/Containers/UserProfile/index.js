import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfileAction } from '../../Actions/UserActions';
import Profile from '../../Components/User/Profile';

class UserProfile extends Component {
    componentDidMount() {
        this.props.fetchProfileAction();
    }

    render() {  
        if (this.props.userdata) {
            return (
                <div>
                    <Profile key={this.props.userdata.id} data={this.props.userdata} />
                </div>         
            );  
        }    
        return <div>Please wait.....</div>;  
    }
}

const mapStateToProps = state => ({
    userdata: state.auth.user,
});

export default connect(mapStateToProps, { fetchProfileAction })(UserProfile);
