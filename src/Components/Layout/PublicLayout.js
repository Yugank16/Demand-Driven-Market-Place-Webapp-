import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../../Containers/User/Login';
import Signup from '../../Containers/User/SignUp';
import NotFound from '../../Components/NotFound';

const PublicLayout = (props) => (
    <div>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="*" component={NotFound} />
        </Switch>
    </div>

);
export default PublicLayout;
