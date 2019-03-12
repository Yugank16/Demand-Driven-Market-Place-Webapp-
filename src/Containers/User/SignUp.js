import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import "../../App.css";
import { signupAction } from '../../Actions/UserActions';
import AuthPage from '../../Components/User/AuthPage';
import FlashMessage from '../FlashMessage';

class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            userType: 3,
            submitted: false,
            errors: {},
            isButtonDisabled: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleValidation() {
        const { firstName, lastName, password, email } = this.state;
        const error = {};
        let formIsValid = true;
        // Email
        const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!email) {
            formIsValid = false;
            error.email = 'Email can not  be empty';
        } else if (!pattern.test(email)) {
            formIsValid = false;
            error.email = 'Please enter valid Email-ID';
        }
        // Firstname
        if (!firstName) {
            formIsValid = false;
            error.firstName = 'Firstname can not be empty';
        } else if (firstName.length < 2) {
            formIsValid = false;
            error.firstName = "Firstname should be atleast 2 character";
        } else if (!firstName.match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            error.firstName = 'Please enter alphabet characters only';   
        }
        // lastname
        if (lastName.length >= 1 && !lastName.match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            error.lastName = 'Please enter alphabet characters only';
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
        this.setState({ submitted: true, isButtonDisabled: true });


        if (this.handleValidation()) {
            const data = {
                email: this.state.email,
                password: this.state.password,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                user_type: this.state.user_type };

            const { signupAction, history } = this.props;
            const response = await signupAction(data);
            if (response) {
                history.push('/home'); 
            }
            this.setState({ isButtonDisabled: false });
        } 
    }

    render() {
        if (localStorage.getItem('user')) {
            this.props.history.push('/home');
        } 
        const { firstName, lastName, email, password, confirmPassword, userType, submitted } = this.state;
        
        return (
            <div>
                <AuthPage />
                <div className="FormCenter">
                    <form onSubmit={this.handleSubmit} className="FormFields">
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="first_name">First Name</label>
                            <input type="text" id="first_name" className="FormField__Input" placeholder="Enter your First name" name="firstName" onChange={this.handleChange} /> 
                            <div className="FormField__Label error-block">{this.state.errors.firstName}</div>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="last_name">Last Name</label>
                            <input type="text" id="last_name" className="FormField__Input" placeholder="Enter your Last name" name="lastName" onChange={this.handleChange} />
                            <div className="FormField__Label error-block">{this.state.errors.lastName}</div>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="email">E-Mail ID</label>
                            <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" onChange={this.handleChange} />
                            <div className="FormField__Label error-block">{this.state.errors.email}</div>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="password">Password</label>
                            <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" onChange={this.handleChange} />
                            <div className="FormField__Label error-block">{this.state.errors.password}</div>
                        </div>

                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="password_confirmation">Confirm Password</label>
                            <input type="password" id="confirm_password" className="FormField__Input" placeholder="Enter your password" name="confirmPassword" onChange={this.handleChange} />
                            {password && confirmPassword !== password &&
                                <div className="FormField__Label error-block">Password does not match</div>
                            }
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="user_type">User Type</label>
                            <select className="FormField__Input" name="userType" onChange={this.handleChange}>
                                <option className="drop_down_text" selected value={3}>Both Buyer and Seller</option>
                                <option className="drop_down_text" value={2} > Only Seller</option>
                                <option className="drop_down_text" value={1} >Only Buyer</option>

                            </select>
                        </div>
                        <div className="FormField">
                            <button className="FormField__Button mr-20" disabled={this.state.isButtonDisabled}>Sign Up</button> <Link to="/" className="FormField__Link">I&#39;m already member</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({ userInfo: state.auth.user });

export default connect(mapStateToProps, { signupAction })(SignUp);
