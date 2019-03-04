import React, { Component } from 'react';
import { Link, Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import "../../App.css";
import AuthPage from '../../Components/User/AuthPage';
import { loginAction } from '../../Actions/UserActions';


class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        this.setState({ submitted: true });

        const data = {
            username: this.state.email,
            password: this.state.password,
        };

        if (email && password) {
            this.props.loginAction(data);
            this.props.history.push('/dashboard');
        }
    }
    render() {
        const { submitted, email, password } = this.state;
        return (
            <div>
                <AuthPage />
                <div className="FormCenter">
                    <form onSubmit={this.handleSubmit} className="FormFields" >
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
                            {submitted && !password &&
                                <div className="FormField__Label error-block">Password is required</div>
                            }
                        </div>

                        <div className="FormField">
                            <button className="FormField__Button mr-20">Log In</button> <Link to="/signup" className="FormField__Link">Create an account</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ userToken: state.UserReducers.token });

export default connect(mapStateToProps, { loginAction })(Login);
