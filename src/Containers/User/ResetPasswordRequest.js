import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserConstants, REGEX } from '../../Constants';
import { passwordResetRequestAction } from '../../Actions/UserActions';
import AuthPage from '../../Components/User/AuthPage';
import '../../App.css';


class ResetPasswordRequest extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            isButtonDisabled: false,
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
        const { email } = this.state;
        const error = {};
        let formIsValid = true;
        // Email
        const pattern = REGEX.EMAIL;
        if (!email) {
            formIsValid = false;
            error.email = 'Email can not  be empty';
        } else if (!pattern.test(email)) {
            formIsValid = false;
            error.email = 'Please enter valid Email';
        }
        this.setState({ errors: error });
        return formIsValid;
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ isButtonDisabled: true });
        const { email } = this.state;
        if (this.handleValidation()) {
            const data = {
                email };
            const { passwordResetRequestAction, history } = this.props;
            const response = await passwordResetRequestAction(data);
            if (response === true) {
                history.push('/');
            } else {
                const { email } = response;
                const error = { email };
                this.setState({ isButtonDisabled: false, errors: error });
            }   
        }
        this.setState({ isButtonDisabled: false });
    }

    render() {
        if (Cookies.get(UserConstants.USER)) {
            this.props.history.push('/home');
        }
        return (
            <div className="screen">
                <div className="login-div">
                    <AuthPage />
                    <div className="form-center">
                        <form onSubmit={this.handleSubmit} className="form-fields" >
                            <div className="form-field">
                                <label className="form-field-label" htmlFor="email">Registered Email</label>
                                <input type="text" id="email" className="form-field-input" placeholder="Enter your registered email" name="email" onChange={this.handleChange} />
                                <div className="form-field-label error-block">{this.state.errors.email}</div>
                            </div>

                            <div className="form-field clearfix">
                                <button className="form-field-button " disabled={this.state.isButtonDisabled}>Send Password Reset Link</button>
                                <Link to="/" className="form-field-link">Login</Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { passwordResetRequestAction })(ResetPasswordRequest);
