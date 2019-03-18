import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FlashMessage from './Containers/FlashMessage';
import NotFound from './Components/NotFound';
import Login from './Containers/User/Login';
import Signup from './Containers/User/SignUp';
import ResetPasswordRequest from './Containers/User/ResetPasswordRequest';
import ForgotPassword from './Containers/User/ForgotPassword';
import RequestItemList from './Containers/RequestItemList';
import UserProfile from './Containers/UserProfile';
import UpdateProfile from './Containers/UserProfile/UpdateProfile';
import ChangePassword from './Containers/UserProfile/Changepassword';
import RequestDetails from './Containers/RequestDetails';
import RequestItem from './Containers/RequestItemForm';
import { ProtectedRoute } from './Helpers/ProtectedRoute';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <FlashMessage />
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/reset-password/" component={ResetPasswordRequest} />
                        <Route exact path="/reset-password/confirm/:id/:reset_token" component={ForgotPassword} />
                        <ProtectedRoute exact path="/home" component={RequestItemList} />
                        <ProtectedRoute exact path="/home/user-profile" component={UserProfile} />
                        <ProtectedRoute exact path="/home/user-profile/update" component={UpdateProfile} />
                        <ProtectedRoute exact path="/home/user-profile/change-password" component={ChangePassword} />
                        <ProtectedRoute exact path="/home/request" component={RequestItem} />
                        <ProtectedRoute exact path="/home/request-details/:id" component={RequestDetails} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
export default App;

