import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../../Containers/User/Login';
import Signup from '../../Containers/User/SignUp';
import NotFound from '../../Components/NotFound';
import ResetPasswordConfirm from '../../Containers/User/ResetPasswordConfirm';
import ResetPasswordRequest from '../../Containers/User/ResetPasswordRequest';

const PublicLayout = (props) => (
    <div>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signup" component={Signup} />            
            <Route exact path="/reset_password/" component={ResetPasswordRequest} />
            <Route exact path="/reset_password/confirm/:id/:reset_token" component={ResetPasswordConfirm} />
            <Route path="*" component={NotFound} />
        </Switch>
    </div>

);
export default PublicLayout;
