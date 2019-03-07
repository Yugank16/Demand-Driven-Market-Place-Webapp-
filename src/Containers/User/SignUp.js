import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import "../../App.css";
import { signupAction } from '../../Actions/UserActions';
import AuthPage from '../../Components/User/AuthPage';

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
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleValidation() {
        const { firstName, email, password, confirmPassword, errors } = this.state;
        const error = {};
        let formIsValid = true;

        // Email
        if (!email) {
            formIsValid = false;
            error.email = "Email can't be empty";
        }

        // Firstname
        if (!firstName) {
            formIsValid = false;
            error.firstName = "Firstname can't be empty";
        } else if (firstName.length < 2) {
            formIsValid = false;
            error.firstName = "Firstname should be valid";
        }

        // Password
        if (password !== confirmPassword) {
            formIsValid = false;
            error.password = "Password doesn't match";
        }
        if (password.length < 6) {
            formIsValid = false;
            error.password = "Password should contain atleast 6 chracters";
        }

        this.setState({ errors: error });
        return formIsValid;
    }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });


        if (this.handleValidation()) {
            const data = {
                email: this.state.email,
                password: this.state.password,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                user_type: this.state.user_type };

            this.props.signupAction(data);
            this.props.history.push('/login');
        } 
    }

    render() {
        if (localStorage.getItem('user')) {
            this.props.history.push('/dashboard');
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
                            {submitted && !firstName &&
                                <div className="FormField__Label error-block">First Name is required</div>
                            }
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="last_name">Last Name</label>
                            <input type="text" id="last_name" className="FormField__Input" placeholder="Enter your Last name" name="lastName" onChange={this.handleChange} />
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="email">E-Mail ID</label>
                            <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" onChange={this.handleChange} />
                            {submitted && !email &&
                                <div className="FormField__Label error-block">Email is required</div>
                            }
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="password">Password</label>
                            <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" onChange={this.handleChange} />
                            {password.length >= 1 && password.length < 6 &&
                                <div className="FormField__Label error-block">Password should be atleast 6 chracters long</div>
                            }
                            {submitted && !password &&
                                <div className="FormField__Label error-block">Password is required</div>
                            }
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
                            <button className="FormField__Button mr-20">Sign Up</button> <Link to="/login" className="FormField__Link">I&#39;m already member</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({ userInfo: state.auth.user });

export default connect(mapStateToProps, { signupAction })(SignUp);
