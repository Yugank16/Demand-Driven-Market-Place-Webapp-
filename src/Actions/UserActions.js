import { UserActionConstants, UserConstants, FlashMessageConstants } from '../Constants/index';

let user;

export const loginAction = data => async (dispatch) => {
    let response = await fetch(`${UserActionConstants.API_BASE_URL}api/login/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (response.status === 400) {
        dispatch({
            type: FlashMessageConstants.FAILURE,
            message: 'User Credentials not Valid',
        });
        return false;
    }
    response = await response.json();
    user = response;
    localStorage.setItem(UserConstants.USER, JSON.stringify(user));
    dispatch({
        type: FlashMessageConstants.SUCCESS,
        message: 'Logged In Successfully',
    });
    return true;
};

export const signupAction = data => async (dispatch) => {
    let response = await fetch(`${UserActionConstants.API_BASE_URL}api/users/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok && response.status === 400) {
        dispatch({
            type: FlashMessageConstants.FAILURE,
            message: 'User With Email-Id Already Exist',
        });
        return false;
    }
    response = await response.json();
    user = {};
    user.token = response.token;
    localStorage.setItem(UserConstants.USER, JSON.stringify(user));
    dispatch({
        type: FlashMessageConstants.SUCCESS,
        message: 'You have successfully signed up',
    });
    return true;
};

export const passwordResetAction = (data, id) => async (dispatch) => {
    let response = await fetch(`${UserActionConstants.API_BASE_URL}api/password_reset/confirm/${id}/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (response.status === 400) {
        dispatch({
            type: FlashMessageConstants.FAILURE,
            message: 'Token not valid',
        });
        return false;
    }
    response = await response.json();
    dispatch({
        type: FlashMessageConstants.SUCCESS,
        message: 'Password has been changed please login',
    });
    return true;
};

export const passwordResetRequestAction = (data) => async (dispatch) => {
    let response = await fetch(`${UserActionConstants.API_BASE_URL}api/password_reset/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    if (response.status === 400) {
        dispatch({
            type: FlashMessageConstants.FAILURE,
            message: 'There is no active user associated with this e-mail address or the password can not be changed',
        });
        return false;
    }
    response = await response.json();
    dispatch({
        type: FlashMessageConstants.SUCCESS,
        message: 'Password reset Link has been sent to your registered email id',
    });
    return true;
};

export const logout = () => {
    localStorage.removeItem("user");
    return {
        type: UserActionConstants.AUTH_LOGOUT,
    };
};
