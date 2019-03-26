import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserConstants } from '../Constants/index';

export const OpenRoutes = ({ component: Component, ...rest }) => (
   
    <Route
        {...rest}
        render={props => {
            if (!Cookies.get(UserConstants.USER)) {
                return (
                    <div>
                        <Component {...props} />
                    </div>

                );
            }

            return (<Redirect to={
                {
                    pathname: '/home',
                    state: {
                        from: props.location,
                    },
                }
            }
            />);
        }}
    />
);
