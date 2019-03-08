import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Containers/User/Login';
import RequestItem from './Containers/RequestItemForm';
import RequestItemList from './Containers/RequestItemList';
import RequestDetails from './Containers/RequestDetails';
import SignUp from './Containers/User/SignUp';
import PrivateLayout from './Components/Layout/PrivateLayout';
import PublicLayout from './Components/Layout/PublicLayout';

import NotFound from './Components/NotFound';
import { ProtectedRoute } from './Helpers/ProtectedRoute';
import FlashMessage from './Containers/FlashMessage';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <FlashMessage />
                    <Switch>
                        <Route path="/home" component={PrivateLayout} />
                        <Route path="/" component={PublicLayout} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
