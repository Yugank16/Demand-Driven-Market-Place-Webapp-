import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Containers/User/Login';
import RequestItem from './Containers/RequestItemForm';
import RequestItemList from './Containers/RequestItemList';
import SignUp from './Containers/User/SignUp';

import { ProtectedRoute } from './Helpers/ProtectedRoute';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/login" component={Login} /> 
                    <ProtectedRoute exact path="/home" component={RequestItemList} />
                    <ProtectedRoute exact path="/home/request" component={RequestItem} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
