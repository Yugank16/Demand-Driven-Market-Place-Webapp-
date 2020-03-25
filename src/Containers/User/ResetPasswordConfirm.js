import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { passwordResetAction } from '../../Actions/UserActions';
import '../../App.css';
import AuthPage from '../../Components/User/AuthPage';

class ResetPasswordConfirm extends Component {
    constructor() {
        super();

        this.state = {
            newPassword: '',
            confirmPassword: '',
            errors: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({ errors: { ...this.state.errors, [e.target.name]: null } });
    }

    handleValidation() {
        const { confirmPassword, newPassword } = this.state;
        const error = {};
        let formIsValid = true;

        // Password
        if (!newPassword) {
            formIsValid = false;
            error.password = 'Password can not be empty';
        } else if (!confirmPassword) {
            formIsValid = false;
            error.password = 'Confirm Password can not be empty';
        } else if (newPassword.length < 6) {
            formIsValid = false;
            error.password = 'Password should contain atleast 6 chracters';
        } 
        if (confirmPassword !== newPassword) {
            formIsValid = false;
            error.confirmPassword = 'Password doesn\'t macth';
        }

        this.setState({ errors: error });
        return formIsValid;
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { newPassword } = this.state;
        if (this.handleValidation()) {
            const data = {
                password: newPassword,
            };
            const { id, reset_token: resetToken } = this.props.data;
            const { passwordResetAction, history } = this.props;
            const response = await passwordResetAction(data, id, resetToken);
            if (response) {
                history.push('/');
            }
        }
    }

    render() {
        return (
            <div className="screen">
                <div className="login-div">
                    <AuthPage />
                    <div className="form-center">
                        <form onSubmit={this.handleSubmit} className="form-fields" >
                            <div className="form-field">
                                <label className="form-field-label" htmlFor="new_password"> New Password</label>
                                <input type="password" id="password" className="form-field-input" placeholder="Enter your new password" name="newPassword" onChange={this.handleChange} />
                                <div className="form-field-label error-block">{this.state.errors.password}</div>
                            </div>
                            <div className="form-field">
                                <label className="form-field-label" htmlFor="confirm_password">Confirm Password</label>
                                <input type="password" id="password" className="form-field-input" placeholder="Enter your new password again" name="confirmPassword" onChange={this.handleChange} />
                                <div className="form-field-label error-block">{this.state.errors.confirmPassword}</div>
                            </div>

                            <div className="form-field">
                                <button className="form-field-button mr-20">Set Password</button> <Link to="/" className="form-field-link">Login with another account</Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(null, { passwordResetAction })(ResetPasswordConfirm));
