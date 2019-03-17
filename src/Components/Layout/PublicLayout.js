import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../../Containers/User/Login';
import Signup from '../../Containers/User/SignUp';
import NotFound from '../../Components/NotFound';
import ForgotPassword from '../../Containers/User/ForgotPassword';
import ResetPasswordRequest from '../../Containers/User/ResetPasswordRequest';

const PublicLayout = (props) => (
    <div>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/reset-password/" component={ResetPasswordRequest} />
            <Route exact path="/reset-password/confirm/:id/:reset_token" component={ForgotPassword} />
        </Switch>
    </div>

);
export default PublicLayout;
