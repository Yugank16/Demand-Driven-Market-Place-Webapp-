import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResetPasswordConfirm from './ResetPasswordConfirm';
import InvalidToken from '../../Components/User/InvalidToken';
import { tokenvalidation } from '../../Actions/UserActions';
 
class ForgotPassword extends Component {

    componentDidMount() {
        this.props.tokenvalidation();
    }

    render() {
        if (this.props.response === 'success') {
            return (
                <div>
                    <ResetPasswordConfirm />
                </div>         
            );  
        } else if (this.props.response === 'failure') {
            return (
                <div>
                    <InvalidToken />
                </div>         
            );  
        }
        return <div>Please Wait.....</div>;
    }
}

const mapStateToProps = state => ({ response: state.auth.token });

export default connect(mapStateToProps, { tokenvalidation })(ForgotPassword);