import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../App.css';
import AuthPage from '../../Components/User/AuthPage';
import { loginAction } from '../../Actions/UserActions';
import { UserConstants, REGEX } from '../../Constants/index';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            errors: {},
            isButtonDisabled: false,
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
        const { password, email } = this.state;
        const error = {};
        let formIsValid = true;
        // Email
        const pattern = REGEX.EMAIL;
        if (!email) {
            formIsValid = false;
            error.email = 'Email can not  be empty';
        } else if (!pattern.test(email)) {
            formIsValid = false;
            error.email = 'Please enter valid Email-ID';
        }
        // Password
        if (!password) {
            formIsValid = false;
            error.password = 'Password can not be empty';
        } else if (password.length < 6) {
            formIsValid = false;
            error.password = 'Password should contain atleast 6 chracters';
        }

        this.setState({ errors: error });
        return formIsValid;
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        this.setState({ isButtonDisabled: true });
        if (this.handleValidation()) {
            const data = {
                username: this.state.email,
                password: this.state.password };
            const { loginAction, history } = this.props;
            const response = await loginAction(data);
            if (response === 1) {
                history.push('/home/my-requests');
            } else if (response === 2 || response === 3) {
                history.push('/home');
            } else {
                const { email, password } = response;
                const error = { email, password };
                this.setState({ isButtonDisabled: false, errors: error });
            }
        }
        this.setState({ isButtonDisabled: false });
    }

    render() {
        return (
            <div className="screen">
                <div className="login-div">
                    <AuthPage />
                    <div className="form-center">
                        <form onSubmit={this.handleSubmit} className="form-fields" >
                            <div className="form-field">
                                <label className="form-field-label" htmlFor="email">E-Mail ID</label>
                                <input type="text" id="email" className="form-field-input" placeholder="Enter your email" name="email" onChange={this.handleChange} />
                                <div className="form-field-label error-block">{this.state.errors.email}</div>
                            </div>
                            <div className="form-field">
                                <label className="form-field-label" htmlFor="password">Password</label>
                                <input type="password" id="password" className="form-field-input" placeholder="Enter your password" name="password" onChange={this.handleChange} />
                                <div className="form-field-label error-block">{this.state.errors.password}</div>
                            </div>

                            <div className="form-field clearfix">
                                <button className="form-field-button mr-20" disabled={this.state.isButtonDisabled}>Log In</button>
                            </div>
                            <div className="form-field">
                                <Link to="/signup" className="form-field-link">Create an account</Link>
                                <Link to="/reset-password" className="form-field-link float-right">Forgot Password ?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Login.protoType = {
    error: PropTypes.object,
};
const mapStateToProps = state => ({ errors: state.auth.errors });

export default connect(mapStateToProps, { loginAction })(Login);
