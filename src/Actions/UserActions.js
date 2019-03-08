import { UserActionConstants, UserConstants, FlashMessageConstants } from '../Constants/index';

let user;

export const loginAction = (data) => dispatch => {
    fetch(`${UserActionConstants.API_BASE_URL}api/login/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => {
        if (res.status === 400) {
            throw Error("User Credentials not Valid");
        }
        return res.json();
    }).then(data => {
        user = data;
        localStorage.setItem(UserConstants.USER, JSON.stringify(user));
        dispatch({
            type: FlashMessageConstants.SUCCESS,
            message: 'Logged In                 Successfully',
        });
    }).catch((err) => {
        console.log(err);
        dispatch({
            type: FlashMessageConstants.FAILURE,
            message: err.message,
        });
    });
};

export const signupAction = (data) => dispatch => {
    fetch(`${UserActionConstants.API_BASE_URL}api/users/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => {
        if (!res.ok && res.status === 400) {
            throw Error("User Already Exist");
        }
        return res.json();
    }).then(data => {
        user = {};
        user.token = data.token;
        console.log(user);
        localStorage.setItem(UserConstants.USER, JSON.stringify(user));  
        dispatch({
            type: FlashMessageConstants.SUCCESS,
            message: 'You have successfully signed up',
        });
    }).catch((err) => {
        console.log(err);
        dispatch({
            type: FlashMessageConstants.FAILURE,
            message: err.message,
        });
    });
};

export const logout = () => {
    localStorage.removeItem("user");
    return {
        type: UserActionConstants.AUTH_LOGOUT,
    };
};
