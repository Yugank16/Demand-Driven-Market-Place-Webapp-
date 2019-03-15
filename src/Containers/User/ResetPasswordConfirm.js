import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { passwordResetAction } from '../../Actions/UserActions';
import '../../App.css';


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
        } else if (confirmPassword !== newPassword) {
            formIsValid = false;
            error.password = 'Password doesn\'t macth';
        }


        this.setState({ errors: error });
        return formIsValid;
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { newPassword } = this.state;
        if (this.handleValidation()) {
            const data = {
                password: newPassword };
            
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
            <div>
                <div className="FormCenter">
                    <form onSubmit={this.handleSubmit} className="FormFields" >
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="new_password"> New Password</label>
                            <input type="password" id="password" className="FormField__Input" placeholder="Enter your new password" name="newPassword" onChange={this.handleChange} />
                            <div className="FormField__Label error-block">{this.state.errors.password}</div>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="confirm_password">Confirm Password</label>
                            <input type="password" id="password" className="FormField__Input" placeholder="Enter your new password again" name="confirmPassword" onChange={this.handleChange} />
                            <div className="FormField__Label error-block">{this.state.errors.password}</div>
                        </div>

                        <div className="FormField">
                            <button className="FormField__Button mr-20">Submit</button> <Link to="/" className="FormField__Link">Login with another account</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(null, { passwordResetAction })(ResetPasswordConfirm));
