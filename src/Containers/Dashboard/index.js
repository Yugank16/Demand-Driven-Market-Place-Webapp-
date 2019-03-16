import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
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
            <div className="sidebar">
                <h3 className="demand">DEMAND DRIVEN MARKETPLACE</h3>
                <h3 className="user">Hello user</h3>
                <Link className="sideanchor log" to="/home" >All Requests</Link>
                <Link className="sideanchor log" to="/home/request" >New Request</Link>
                <Link className="sideanchor log" to="/home/user-profile" >Account</Link>
                <button className="sideanchor log" onClick={() => this.logoutuser()} >Logout</button>
            </div>
        );
    }
}


export default withRouter(connect(null, { logout })(Dashboard));
