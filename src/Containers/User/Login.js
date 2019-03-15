import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../App.css';
import AuthPage from '../../Components/User/AuthPage';
import { loginAction } from '../../Actions/UserActions';


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
    }

    handleValidation() {
        const { password, email } = this.state;
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
            if (response) {
                history.push('/home');
            }
        }
        this.setState({ isButtonDisabled: false });
    }

    render() {
        if (localStorage.getItem('user')) {
            this.props.history.push('/home');
        }
        return (
            <div>
                <AuthPage />
                <div className="FormCenter">
                    <form onSubmit={this.handleSubmit} className="FormFields" >
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="email">E-Mail ID</label>
                            <input type="text" id="email" className="FormField__Input" placeholder="Enter your email" name="email" onChange={this.handleChange} />
                            <div className="FormField__Label error-block">{this.state.errors.email}</div>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="password">Password</label>
                            <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" onChange={this.handleChange} />
                            <div className="FormField__Label error-block">{this.state.errors.password}</div>
                        </div>

                        <div className="FormField">
                            <button className="FormField__Button mr-20" disabled={this.state.isButtonDisabled}>Log In</button>
                        </div>
                        <div className="FormField">
                            <Link to="/signup" className="FormField__Link">Create an account</Link>
                        </div>
                        <div className="FormField">
                            <Link to="/reset-password" className="FormField__Link">Forgot Password ?</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ userToken: state.auth.token });

export default connect(mapStateToProps, { loginAction })(Login);
