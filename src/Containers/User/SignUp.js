import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { UserConstants, REGEX } from '../../Constants/index';
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
            if (response === true) {
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
        if (Cookies.get(UserConstants.USER)) {
            this.props.history.push('/home');
        }
        const { password, confirmPassword } = this.state;

        return (
            <div className="Screen_Signup">
                <div className="SignupDiv">
                    <AuthPage />
                    <div className="FormCenter clearfix">
                        <form onSubmit={this.handleSubmit} className="FormFields_Signup">
                            <div className="clearfix">
                                <div className="FormField_Signup">
                                    <label className="FormField__Label" htmlFor="first_name">First Name</label>
                                    <input type="text" id="first_name" className="FormField__Input" placeholder="Enter your First name" name="firstName" onChange={this.handleChange} />
                                    <div className="FormField__Label error-block">{this.state.errors.firstName}</div>
                                </div>
                                <div className="FormField_Signup">
                                    <label className="FormField__Label" htmlFor="last_name">Last Name</label>
                                    <input type="text" id="last_name" className="FormField__Input" placeholder="Enter your Last name" name="lastName" onChange={this.handleChange} />
                                    <div className="FormField__Label error-block">{this.state.errors.lastName}</div>
                                </div>
                            </div>
                            <div className="clearfix">
                                <div className="FormField_Signup">
                                    <label className="FormField__Label" htmlFor="email">E-Mail ID</label>
                                    <input type="text" id="email" className="FormField__Input" placeholder="Enter your email" name="email" onChange={this.handleChange} />
                                    <div className="FormField__Label error-block">{this.state.errors.email}</div>
                                </div>
                                <div className="FormField_Signup">
                                    <label className="FormField__Label" htmlFor="Phone_number">Phone Number</label>
                                    <input type="text" id="Phone_number" className="FormField__Input" name="phoneNumber" onChange={this.handleChange} />
                                    <div className="FormField__Label error-block">{this.state.errors.phoneNumber}</div>
                                </div>
                            </div>
                            <div className="clearfix">
                                <div className="FormField_Signup">
                                    <label className="FormField__Label" htmlFor="datetime">Birth Date</label>
                                    <input type="date" id="datetime" className="FormField__Input" name="birthDate" onChange={this.handleChange} />
                                    <div className="FormField__Label error-block">{this.state.errors.birthDate}</div>
                                </div>
                                <div className="FormField_Signup">
                                    <label className="FormField__Label" htmlFor="gender">Gender</label>
                                    <select className="FormField__Input" name="gender" onChange={this.handleChange}>
                                        <option className="drop_down_text" selected value="MALE">Male</option>
                                        <option className="drop_down_text" value="FEMALE" >Female</option>
                                        <option className="drop_down_text" value="OTHERS" >Special</option>
                                    </select>
                                </div>
                            </div>
                            <div className="clearfix">
                                <div className="FormField_Signup">
                                    <label className="FormField__Label" htmlFor="password">Password</label>
                                    <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" onChange={this.handleChange} />
                                    <div className="FormField__Label error-block">{this.state.errors.password}</div>
                                </div>

                                <div className="FormField_Signup">
                                    <label className="FormField__Label" htmlFor="password_confirmation">Confirm Password</label>
                                    <input type="password" id="confirm_password" className="FormField__Input" placeholder="Enter your password" name="confirmPassword" onChange={this.handleChange} />
                                    {password && confirmPassword !== password &&
                                        <div className="FormField__Label error-block">Password does not match</div>
                                    }
                                </div>
                            </div>
                            <div className="FormField_Signup">
                                <label className="FormField__Label" htmlFor="user_type">User Type</label>
                                <select className="FormField__Input" name="userType" onChange={this.handleChange}>
                                    <option className="drop_down_text" selected value={3}>Both Buyer and Seller</option>
                                    <option className="drop_down_text" value={2} > Only Seller</option>
                                    <option className="drop_down_text" value={1} >Only Buyer</option>

                                </select>
                            </div>                          
                            <div className="FormField clearfix">
                                <button className="FormField__Button margin_signup_button" disabled={this.state.isButtonDisabled}>Sign Up</button>
                                <Link to="/" className="FormField__Link signup_link float_left">I&#39;m already member</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({ errors: state.auth.errors });

export default connect(mapStateToProps, { signupAction })(SignUp);
