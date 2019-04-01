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
            const UserType = JSON.parse(localStorage.getItem('userType'));
            if (UserType === UserConstants.BUYER) {
                return (<Redirect to={
                    {
                        pathname: '/home/my-requests',
                        state: {
                            from: props.location,
                        },
                    }
                }
                />);
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
