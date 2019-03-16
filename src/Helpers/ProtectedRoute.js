import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserConstants } from '../Constants/index';

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (Cookies.get(UserConstants.USER)) {
                return <Component {...props} />;
            }
            
            return (<Redirect to={
                {
                    pathname: '/',
                    state: {
                        from: props.location,
                    },
                }
            } 
            />);
        }}
    />
);
