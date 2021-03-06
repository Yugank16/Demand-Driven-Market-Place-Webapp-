import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePasswordAction } from '../../Actions/UserActions';

class ChangePassword extends Component {
    constructor() {
        super();
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
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
        this.setState({ errors: error });
        return formIsValid;
    }


    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ isButtonDisabled: true });
        const error = {};
        if (this.handleValidation()) {
            const data = {
                password: this.state.oldPassword,
                new_password: this.state.newPassword,
            };
            const { changePasswordAction, history } = this.props;
            const response = await changePasswordAction(data);
            if (response === true) {
                history.push('/home/user-profile');
            } else {
                const error = { oldPassword: response.non_field_errors[0] };
                this.setState({ isButtonDisabled: false, errors: error });
            }
        }
        this.setState({ isButtonDisabled: false });
    }

    render() {
        return (
            <div>
                <div className="content">
                    <h2>Change  Password</h2>
                    <form onSubmit={this.handleSubmit} className="form-fields">
                        <div className="form-field">
                            <label className="form-field-label" htmlFor="password">Old Password</label>
                            <input type="password" value={this.state.firstName} id="password" className="form-field-input" placeholder="Enter your Old Password" name="oldPassword" onChange={this.handleChange} />
                            <div className="form-field-label error-block">{this.state.errors.oldPassword}</div>
                        </div>
                        <div className="form-field">
                            <label className="form-field-label" htmlFor="newpassword">New Password</label>
                            <input type="password" value={this.state.firstName} id="newpassword" className="form-field-input" placeholder="Enter your New Password" name="newPassword" onChange={this.handleChange} />
                            <div className="form-field-label error-block">{this.state.errors.newPassword}</div>
                        </div>
                        <div className="form-field">
                            <label className="form-field-label" htmlFor="confirmpassword">Confirm Password</label>
                            <input type="password" value={this.state.firstName} id="confirmpassword" className="form-field-input" placeholder="Enter your Old Password" name="confirmPassword" onChange={this.handleChange} />
                            <div className="form-field-label error-block">{this.state.errors.confirmPassword}</div>
                        </div>
                        <div className="form-field">
                            <button className="form-field-button mr-20" disabled={this.state.isButtonDisabled}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default connect(null, { changePasswordAction })(ChangePassword);
