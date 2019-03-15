import React, { Component } from 'react';
import { connect } from 'react-redux';
import { passwordResetRequestAction } from '../../Actions/UserActions';
import '../../App.css';


class ResetPasswordRequest extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
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
        const { email } = this.state;
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
        this.setState({ errors: error });
        return formIsValid;
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { email } = this.state;
        if (this.handleValidation()) {
            const data = {
                email };
            const { passwordResetRequestAction, history } = this.props;
            const response = await passwordResetRequestAction(data);
            
            history.push('/');
        }
    }

    render() {
        if (localStorage.getItem('user')) {
            this.props.history.push('/home');
        }
        return (
            <div className="FormCenter">
                <form onSubmit={this.handleSubmit} className="FormFields" >
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">REGISTERED E-Mail ID</label>
                        <input type="text" id="email" className="FormField__Input" placeholder="Enter your registered email" name="email" onChange={this.handleChange} />
                        <div className="FormField__Label error-block">{this.state.errors.email}</div>
                    </div>
                    <div className="FormField">
                        <button className="FormField__Button mr-20">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(null, { passwordResetRequestAction })(ResetPasswordRequest);
