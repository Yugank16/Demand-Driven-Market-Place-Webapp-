import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter, Link } from 'react-router-dom';
import './Dashboard.css';
import { logout, usertype } from '../../Actions/UserActions';


class Dashboard extends Component {
    logoutuser = () => {
        const { logout, history } = this.props;
        logout();
        history.push('/');
    }
    render() {
        const userType = JSON.parse(localStorage.getItem('userType'));
        return (
            <div className="sidebar clearfix">
                <Link to="/" ><h3 className="demand">DEMAND DRIVEN MARKETPLACE</h3></Link>
                {(userType === 2 || userType === 3 || !userType) && <NavLink activeClassName="sideanchor log-active" className="sideanchor log" exact to="/home" >Item Requests</NavLink>}
                {(userType === 1 || userType === 3 || !userType) && <NavLink activeClassName="sideanchor log-active" className="sideanchor log" exact to="/home/my-requests" >My Requests</NavLink>}
                {(userType === 2 || userType === 3 || !userType) && <NavLink activeClassName="sideanchor log-active" className="sideanchor log" exact to="/home/my-bids" >My Bids</NavLink>}
                {(userType === 1 || userType === 3 || !userType) && <NavLink activeClassName="sideanchor log-active" className="sideanchor log" exact to="/home/request" >Post Request</NavLink>}
                <NavLink activeClassName="sideanchor log-active" className="sideanchor log" exact to="/home/user-profile" >Profile</NavLink>
                <button className="sideanchor log" onClick={() => this.logoutuser()} >Logout</button>
            </div>
        );
    }
}


export default withRouter(connect(null, { logout })(Dashboard));
