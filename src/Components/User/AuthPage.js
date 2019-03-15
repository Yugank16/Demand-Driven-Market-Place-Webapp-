import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../App.css';

const AuthPage = () => (
    <div className="Screen__Form">

        <div className="FormTitle">
            <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Log In</NavLink> or
            <NavLink exact to="/signup" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
        </div>
    </div>
);
export default AuthPage;

