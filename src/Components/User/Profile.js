import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css';
import dummyimage from '../../Assets/Images/index.png';

const Profile = (props) => (
    <div>
        <div className="profile-div">
            <div>
                <h2>Profile</h2>
                
                <div className="dp-info">
                    {props.data.profile_photo &&
                        <img className="dp" src={props.data.profile_photo} alt="profile" />}
                    {props.data.profile_photo === null &&
                        <img src={dummyimage} alt="hello" />}
                </div>
                <div className="user-info">        
                    <h3>Name : {props.data.first_name}&nbsp;{props.data.last_name} </h3>
                    <h3>Email : {props.data.email}</h3>
                    <h3>Gender : {props.data.gender}</h3>
                    <h3>Phone Number : {props.data.phone_number}</h3>
                    <h3>DOB : {props.data.birth_date} </h3>
                </div>
                <Link className="profile-update-link" to="/home/user-profile/update">Update Profile</Link>
                <Link className="change-password-link" to="/home/user-profile/change-password">Change Password</Link>
            </div>
        </div>
    </div>

);


export default Profile;
