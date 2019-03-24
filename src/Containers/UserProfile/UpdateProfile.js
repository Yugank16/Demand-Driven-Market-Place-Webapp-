import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchProfileAction, updateProfileAction } from '../../Actions/UserActions';

class UpdateProfile extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            gender: 'MALE',
            phoneNumber: '',
            profilePhoto: '',
            userType: 3,
            errors: {},
            isButtonDisabled: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchProfileAction();
    }

    componentWillReceiveProps(nextprops) {
        this.setState({ firstName: nextprops.userdata.first_name });
        this.setState({ lastName: nextprops.userdata.last_name });
        this.setState({ phoneNumber: nextprops.userdata.phone_number });
        this.setState({ birthDate: nextprops.userdata.birth_date });
        this.setState({ gender: nextprops.userdata.gender });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({ errors: { ...this.state.errors, [e.target.name]: null } });
    }

    handleFileChange(e) {
        this.setState({ profilePhoto: e.target.files[0] });
    }

    handleValidation() {
        const { firstName, lastName, phoneNumber, birthDate } = this.state;
        const error = {};
        let formIsValid = true;
    
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

        // PhoneNumber
        const phonepattern = new RegExp(/^[6-9]{1}\d{9}$/);
        if (!phoneNumber) {
            formIsValid = false;
            error.phoneNumber = 'Phonenumber can not be empty'; 
        } else if (!phonepattern.test(phoneNumber)) {
            formIsValid = false;
            error.phoneNumber = 'Please enter a valid 10 digit Phonenumber';
        }
        
        // Birthdate
        const patternDate = new RegExp(/^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/);
        if (!birthDate) {
            formIsValid = false;
            error.birthDate = 'Birthdate can not be empty';
        } else if (!patternDate.test(birthDate)) {
            formIsValid = false;
            error.birthDate = 'Please enter a valid Date';
        }

        this.setState({ errors: error });
        return formIsValid;
    }


    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ isButtonDisabled: true });
        if (this.handleValidation()) {
            const data = {
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                phone_number: this.state.phoneNumber,
                gender: this.state.gender,
                birth_date: this.state.birthDate,
                user_type: this.state.userType,
            };
            if (this.state.profilePhoto) {
                data.profile_photo = this.state.profilePhoto;
            }
            const { updateProfileAction, history } = this.props;
            const response = await updateProfileAction(data);
            if (response === true) {
                history.push('/home/user-profile');
            } else {
                const { first_name: firstName, last_name: lastName, birth_date: birthDate, phone_number: phoneNumber, gender, profile_photo: profilePhoto } = response;
                const error = { firstName, lastName, birthDate, phoneNumber, gender, profilePhoto };
                this.setState({ isButtonDisabled: false, errors: error });
            }
        }
        this.setState({ isButtonDisabled: false });
    }

    render() {
        return (
            <div>
                <div className="content">
                    <h2>Update Profile</h2>
                    <form onSubmit={this.handleSubmit} className="FormFields">
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="first_name">First Name</label>
                            <input type="text" value={this.state.firstName} id="first_name" className="FormField__Input" placeholder="Enter your First name" name="firstName" onChange={this.handleChange} />
                            <div className="FormField__Label error-block">{this.state.errors.firstName}</div>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="last_name">Last Name</label>
                            <input type="text" value={this.state.lastName} id="last_name" className="FormField__Input" placeholder="Enter your Last name" name="lastName" onChange={this.handleChange} />
                            <div className="FormField__Label error-block">{this.state.errors.lastName}</div>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="Phone_number">Phone Number</label>
                            <input type="text" value={this.state.phoneNumber} id="Phone_number" className="FormField__Input" name="phoneNumber" onChange={this.handleChange} />
                            <div className="FormField__Label error-block">{this.state.errors.phoneNumber}</div>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="datetime">Birtth Date</label>
                            <input type="date" value={this.state.birthDate} id="datetime" className="FormField__Input" name="birthDate" onChange={this.handleChange} />
                            <div className="FormField__Label error-block">{this.state.errors.birthDate}</div>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="user_type">Gender</label>
                            <select value={this.state.gender} className="FormField__Input" name="gender" onChange={this.handleChange}>
                                <option className="drop_down_text" value="MALE">MALE</option>
                                <option className="drop_down_text" value="FEMALE" >FEMALE</option>
                                <option className="drop_down_text" value="OTHERS" >OTHERS</option>
                            </select>
                            <div className="FormField__Label error-block">{this.state.errors.gender}</div>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="photo">profile Photo</label>
                            <input type="file" id="profilephoto" name="profilePhoto" onChange={this.handleFileChange} />
                            <div className="FormField__Label error-block">{this.state.errors.profilePhoto}</div>
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
UpdateProfile.protoType = {
    userdata: PropTypes.object,
};

const mapStateToProps = state => ({
    userdata: state.auth.user,
});

export default connect(mapStateToProps, { fetchProfileAction, updateProfileAction })(UpdateProfile);

