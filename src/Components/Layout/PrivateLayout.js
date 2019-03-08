import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../Containers/Dashboard';
import { ProtectedRoute } from '../../Helpers/ProtectedRoute';
import RequestItem from '../../Containers/RequestItemForm';
import RequestItemList from '../../Containers/RequestItemList';
import RequestDetails from '../../Containers/RequestDetails';
import NotFound from '../../Components/NotFound';
import FlashMessage from '../../Containers/FlashMessage';


const PrivateLayout = (props) => (
    <div>
        <Dashboard />
        <FlashMessage />
        <Switch>
            <ProtectedRoute exact path="/home" component={RequestItemList} />
            <ProtectedRoute exact path="/home/request" component={RequestItem} />
            <ProtectedRoute exact path="/home/request-details/:id" component={RequestDetails} />
            <Route path="*" component={NotFound} />
        </Switch>
    </div>

);
export default PrivateLayout;
