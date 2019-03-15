import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../Containers/Dashboard';
import { ProtectedRoute } from '../../Helpers/ProtectedRoute';
import RequestItem from '../../Containers/RequestItemForm';
import RequestItemList from '../../Containers/RequestItemList';
import RequestDetails from '../../Containers/RequestDetails';
import NotFound from '../../Components/NotFound';
import UserProfile from '../../Containers/UserProfile';
import UpdateProfile from '../../Containers/UserProfile/UpdateProfile';
import ChangePassword from '../../Containers/UserProfile/Changepassword';

const PrivateLayout = () => (
    <div>

        <Dashboard />
        <Switch>
            <ProtectedRoute exact path="/home" component={RequestItemList} />
            <ProtectedRoute exact path="/home/user-profile" component={UserProfile} />
            <ProtectedRoute exact path="/home/user-profile/update" component={UpdateProfile} />
            <ProtectedRoute exact path="/home/user-profile/change-password" component={ChangePassword} />
            <ProtectedRoute exact path="/home/request" component={RequestItem} />
            <ProtectedRoute exact path="/home/request-details/:id" component={RequestDetails} />
            <ProtectedRoute path="/home/*" component={NotFound} />
        </Switch>

        
    </div>

);
export default PrivateLayout;
