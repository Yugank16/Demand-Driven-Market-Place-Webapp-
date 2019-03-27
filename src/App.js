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
import BidForm from './Containers/Bid/BidForm';
import { ProtectedRoute } from './Helpers/ProtectedRoute';
import { OpenRoutes } from "./Helpers/OpenRoutes";
import MyItemRequests from './Containers/MyItemRequests';
import BidDetails from './Containers/Bid/BidDetails';
import AllBids from './Containers/Bid/AllBids';
import MyBids from './Containers/Bid/MyBids';
import Socket from './Containers/socket';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <FlashMessage />
                    <Switch>
                        <OpenRoutes exact path="/" component={Login} />
                        <OpenRoutes exact path="/signup" component={Signup} />
                        <OpenRoutes exact path="/reset-password/" component={ResetPasswordRequest} />
                        <OpenRoutes exact path="/reset-password/confirm/:id/:reset_token" component={ForgotPassword} />
                        <ProtectedRoute exact path="/home" component={RequestItemList} />
                        <ProtectedRoute exact path="/home/my-requests" component={MyItemRequests} />
                        <ProtectedRoute exact path="/home/user-profile" component={UserProfile} />
                        <ProtectedRoute exact path="/home/user-profile/update" component={UpdateProfile} />
                        <ProtectedRoute exact path="/home/bid/:id" component={BidDetails} />
                        <ProtectedRoute exact path="/home/request/:id/bid" component={BidForm} />
                        <ProtectedRoute exact path="/home/request/:id/bids" component={AllBids} />
                        <ProtectedRoute exact path="/home/my-bids" component={MyBids} />
                        <ProtectedRoute exact path="/home/user-profile/change-password" component={ChangePassword} />
                        <ProtectedRoute exact path="/home/request" component={RequestItem} />
                        <ProtectedRoute exact path="/home/request/:id" component={RequestDetails} />
                        <Route exact path="/socket/:id" component={Socket} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
export default App;

