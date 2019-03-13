import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ChangePasswordAction } from '../../Actions/UserActions';

class ChangePassword extends Component {
    constructor() {
        super();
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
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
        const { oldPassword, newPassword, confirmPassword } = this.state;
        const error = {};
        let formIsValid = true;
        if (!oldPassword) {
            formIsValid = false;
            error.oldPassword = 'Password can not be empty';
        } else if (oldPassword.length < 6) {
            formIsValid = false;
            error.oldPassword = 'Password should contain atleast 6 chracters';
        }
        if (!newPassword) {
            formIsValid = false;
            error.newPassword = 'New password can not be empty';
        } else if (newPassword.length < 6) {
            formIsValid = false;
            error.newPassword = 'Password should contain atleast 6 chracters';
        } else if (oldPassword === newPassword) {
            formIsValid = false;
            error.newPassword = 'New password can not be same as old password';
        }
        if (!confirmPassword) {
            formIsValid = false;
            error.confirmPassword = 'Confirm password can not be empty';
        } else if (confirmPassword.length < 6) {
            formIsValid = false;
            error.confirmPassword = 'Password should contain atleast 6 chracters';
        } else if (confirmPassword !== newPassword) {
            formIsValid = false;
            error.confirmPassword = 'Password does not match';
        }
        console.log('hi');
        this.setState({ errors: error });
        return formIsValid;
    }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true, isButtonDisabled: true });
        console.log('hrer');
        if (this.handleValidation()) {
            const data = {
                password: this.state.oldPassword,
                new_password: this.state.newPassword,
            };
            const { ChangePasswordAction, history } = this.props;
            const response = ChangePasswordAction(data);
            if (response) {
                history.push('/home/user-profile');
            }
            this.setState({ isButtonDisabled: false });
        }
    }

    render() {
        const { submitted } = this.state;
        return (
            <div>
                <div className="content">
                    <h2>Change  Password</h2>
                    <form onSubmit={this.handleSubmit} className="FormFields">
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="password">Old Password</label>
                            <input type="password" value={this.state.firstName} id="password" className="FormField__Input" placeholder="Enter your Old Password" name="oldPassword" onChange={this.handleChange} />
                            <div className="FormField__Label error-block">{this.state.errors.oldPassword}</div>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="newpassword">New Password</label>
                            <input type="password" value={this.state.firstName} id="newpassword" className="FormField__Input" placeholder="Enter your New Password" name="newPassword" onChange={this.handleChange} />
                            <div className="FormField__Label error-block">{this.state.errors.newPassword}</div>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="confirmpassword">Confirm Password</label>
                            <input type="password" value={this.state.firstName} id="confirmpassword" className="FormField__Input" placeholder="Enter your Old Password" name="confirmPassword" onChange={this.handleChange} />
                            <div className="FormField__Label error-block">{this.state.errors.confirmPassword}</div>
                        </div>
                        <div className="FormField">
                            <button className="FormField__Button mr-20" disabled={this.state.isButtonDisabled}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default connect(null, { ChangePasswordAction })(ChangePassword);
