import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserConstants } from '../Constants/index';
import Dashboard from '../Containers/Dashboard';

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (Cookies.get(UserConstants.USER)) {
                return (
                    <div>
                        <Dashboard />
                        <Component {...props} />
                    </div>

                );
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
