import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { UserConstants } from '../../Constants/index';
import ResetPasswordConfirm from './ResetPasswordConfirm';
import InvalidToken from '../../Components/User/InvalidToken';
import { tokenvalidation } from '../../Actions/UserActions';


class ForgotPassword extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.tokenvalidation(id, this.props.match.params.reset_token);
    }

    render() {
        if (Cookies.get(UserConstants.USER)) {
            this.props.history.push('/home');
        }
        if (this.props.response === 'success') {
            return (
                <div>
                    <ResetPasswordConfirm data={this.props.match.params} />
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

const mapStateToProps = state => ({ response: state.auth.message });

export default connect(mapStateToProps, { tokenvalidation })(ForgotPassword);
