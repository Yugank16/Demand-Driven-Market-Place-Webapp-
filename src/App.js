import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './Containers/Dashboard';
import Login from "./Containers/User/Login";
import SignUp from "./Containers/User/SignUp";


import { ProtectedRoute } from './Helpers/ProtectedRoute';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/login" component={Login} /> 
                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
