import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { REGEX } from '../../Constants/index';
import '../../App.css';
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
            gender: 'MALE',
            birthDate: '',
            phoneNumber: '',
            errors: {},
            isButtonDisabled: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        // const { named:name } = e.target;
        this.setState({ [e.target.name]: e.target.value });

        this.setState({ errors: { ...this.state.errors, [e.target.name]: null } });
    }

    handleValidation() {
        const { firstName, lastName, password, email, confirmPassword, phoneNumber, birthDate } = this.state;
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
        // Firstname
        if (!firstName) {
            formIsValid = false;
            error.firstName = 'Firstname can not be empty';
        } else if (firstName.length < 2) {
            formIsValid = false;
            error.firstName = 'Firstname should be atleast 2 character';
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
        } else if (confirmPassword !== password) {
            formIsValid = false;
            error.password = 'Password doesn\'t macth';
        }

        const patternDate = new RegExp(/^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/);
        if (!birthDate) {
            formIsValid = false;
            error.birthDate = 'Birthdate can not be empty';
        } else if (!patternDate.test(birthDate)) {
            formIsValid = false;
            error.birthDate = 'Please enter a valid Date';
        }

        const phonepattern = new RegExp(/^[6-9]{1}\d{9}$/);
        // PhoneNumber
        if (!phoneNumber) {
            formIsValid = false;
            error.phoneNumber = 'Phonenumber can not be empty';
        } else if (!phonepattern.test(phoneNumber)) {
            formIsValid = false;
            error.phoneNumber = 'Please enter a valid 10 digit Phonenumber';
        }

        this.setState({ errors: error });
        return formIsValid;
    }


    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ isButtonDisabled: true });


        if (this.handleValidation()) {
            const data = {
                email: this.state.email,
                password: this.state.password,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                user_type: this.state.userType,
                birth_date: this.state.birthDate,
                phone_number: this.state.phoneNumber,
                gender: this.state.gender };
            const { signupAction, history } = this.props;
            const response = await signupAction(data);
            if (response === 1) {
                history.push('/home/my-requests');
            } else if (response === 2 || response === 3) {
                history.push('/home');
            } else {
                const { email, password, first_name: firstName, last_name: lastName, user_type: userType, birth_date: birthDate, phone_number: phoneNumber, gender } = response;
                const error = { email, password, firstName, lastName, userType, birthDate, phoneNumber, gender };
                this.setState({ isButtonDisabled: false, errors: error });
            }
        }
        this.setState({ isButtonDisabled: false });
    }

    render() {   
        const { password, confirmPassword } = this.state;
        return (
            <div className="screen-signup">
                <div className="signup-div">
                    <AuthPage />
                    <div className="form-center clearfix">
                        <form onSubmit={this.handleSubmit} className="form-fields-signup">
                            <div className="clearfix">
                                <div className="form-field-signup">
                                    <label className="form-field-label" htmlFor="first_name">First Name</label>
                                    <input type="text" id="first_name" className="form-field-input" placeholder="Enter your First name" name="firstName" onChange={this.handleChange} />
                                    <div className="form-field-label error-block">{this.state.errors.firstName}</div>
                                </div>
                                <div className="form-field-signup">
                                    <label className="form-field-label" htmlFor="last_name">Last Name</label>
                                    <input type="text" id="last_name" className="form-field-input" placeholder="Enter your Last name" name="lastName" onChange={this.handleChange} />
                                    <div className="form-field-label error-block">{this.state.errors.lastName}</div>
                                </div>
                            </div>
                            <div className="clearfix">
                                <div className="form-field-signup">
                                    <label className="form-field-label" htmlFor="email">E-Mail ID</label>
                                    <input type="text" id="email" className="form-field-input" placeholder="Enter your email" name="email" onChange={this.handleChange} />
                                    <div className="form-field-label error-block">{this.state.errors.email}</div>
                                </div>
                                <div className="form-field-signup">
                                    <label className="form-field-label" htmlFor="Phone_number">Phone Number</label>
                                    <input type="text" id="Phone_number" className="form-field-input" placeholder="Enter your mobile number" name="phoneNumber" onChange={this.handleChange} />
                                    <div className="form-field-label error-block">{this.state.errors.phoneNumber}</div>
                                </div>
                            </div>
                            <div className="clearfix">
                                <div className="form-field-signup">
                                    <label className="form-field-label" htmlFor="datetime">Birth Date</label>
                                    <input type="date" id="datetime" className="form-field-input" name="birthDate" onChange={this.handleChange} />
                                    <div className="form-field-label error-block">{this.state.errors.birthDate}</div>
                                </div>
                                <div className="form-field-signup">
                                    <label className="form-field-label" htmlFor="gender">Gender</label>
                                    <select className="form-field-input" name="gender" onChange={this.handleChange}>
                                        <option className="drop-down-text" selected value="MALE">Male</option>
                                        <option className="drop-down-text" value="FEMALE" >Female</option>
                                        <option className="drop-down-text" value="OTHERS" >Special</option>
                                    </select>
                                </div>
                            </div>
                            <div className="clearfix">
                                <div className="form-field-signup">
                                    <label className="form-field-label" htmlFor="password">Password</label>
                                    <input type="password" id="password" className="form-field-input" placeholder="Enter your password" name="password" onChange={this.handleChange} />
                                    <div className="form-field-label error-block">{this.state.errors.password}</div>
                                </div>

                                <div className="form-field-signup">
                                    <label className="form-field-label" htmlFor="password_confirmation">Confirm Password</label>
                                    <input type="password" id="confirm_password" className="form-field-input" placeholder="Enter your password" name="confirmPassword" onChange={this.handleChange} />
                                    {password && confirmPassword !== password &&
                                        <div className="form-field-label error-block">Password does not match</div>
                                    }
                                </div>
                            </div>
                            <div className="form-field-signup">
                                <label className="form-field-label" htmlFor="user_type">User Type</label>
                                <select className="form-field-input" name="userType" onChange={this.handleChange}>
                                    <option className="drop-down-text" selected value={3}>Both Buyer and Seller</option>
                                    <option className="drop-down-text" value={2} > Only Seller</option>
                                    <option className="drop-down-text" value={1} >Only Buyer</option>

                                </select>
                            </div>                          
                            <div className="form-field clearfix">
                                <button className="form-field-button margin-signup-button" disabled={this.state.isButtonDisabled}>Sign Up</button>
                                <Link to="/" className="form-field-link signup-link float-left">I&#39;m already member</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

SignUp.protoType = {
    error: PropTypes.object,
};

const mapStateToProps = state => ({ errors: state.auth.errors });

export default connect(mapStateToProps, { signupAction })(SignUp);
