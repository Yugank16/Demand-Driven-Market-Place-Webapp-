import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css';
import dummyimage from '../../Assets/Images/index.png';

const Profile = (props) => (
    <div>
        <div className="content">
            <div>
                <h2>Profile</h2>
                <div>
                    <Link to="/home/user-profile/update">Update Profile</Link>
                </div>
                <div>
                    <Link to="/home/user-profile/change-password">Change Password</Link>
                </div>
                <div>
                    {props.data.profile_photo &&
                        <img src={props.data.profile_photo} alt="profile" />}
                    {!props.data.profile_photo &&
                        <img src={dummyimage} alt="hello" />}
                    <h3>First Name : {props.data.first_name}</h3>
                    <h3>Last Name : {props.data.last_name}</h3>
                    <h3>Email : {props.data.email}</h3>
                    <h3>Gender: {props.data.gender}</h3>
                    <h3>Phone number : {props.data.phone_number}</h3>
                    <h3>Date of Birth : {props.data.birth_date}</h3>
                </div>
            </div>
        </div>
    </div>

);


export default Profile;
