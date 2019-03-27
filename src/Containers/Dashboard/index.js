import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import './Dashboard.css';
import { logout } from '../../Actions/UserActions';


class Dashboard extends Component {
    constructor() {
        super();
        this.logoutuser = this.logoutuser.bind(this);
    }
    logoutuser() {
        const { logout, history } = this.props;
        logout();
        history.push('/');
    }
    render() {
        return (
            <div className="sidebar clearfix">
                <h3 className="demand">DEMAND DRIVEN MARKETPLACE</h3>
                <h3 className="user">Welcome User</h3>
                <NavLink activeClassName="sideanchor log-active" className="sideanchor log" exact to="/home" >Item Requests</NavLink>
                <NavLink activeClassName="sideanchor log-active" className="sideanchor log" exact to="/home/my-requests" >My Requests</NavLink>
                <NavLink activeClassName="sideanchor log-active" className="sideanchor log" exact to="/home/my-bids" >My Bids</NavLink>
                <NavLink activeClassName="sideanchor log-active" className="sideanchor log" exact to="/home/request" >Post Request</NavLink>
                <NavLink activeClassName="sideanchor log-active" className="sideanchor log" exact to="/home/user-profile" >Profile</NavLink>
                <button className="sideanchor log" onClick={() => this.logoutuser()} >Logout</button>
            </div>
        );
    }
}


export default withRouter(connect(null, { logout })(Dashboard));
