import Cookies from 'js-cookie';
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
    Cookies.set(UserConstants.USER, JSON.stringify(user));
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
        response = await response.json();
        return response;
    }
    response = await response.json();
    user = {};
    user.token = response.token;
    Cookies.set(UserConstants.USER, JSON.stringify(user));
    dispatch({
        type: FlashMessageConstants.SUCCESS,
        message: 'You have successfully signed up',
    });
    return true;
};

export const updateProfileAction = data => async (dispatch) => {
    const userdata = JSON.parse(Cookies.get(UserConstants.USER));
    const formD = new FormData();
    Object.entries(data).forEach(([key, value]) => formD.append(key, value));
    let response = await fetch(`${UserActionConstants.API_BASE_URL}api/users/`, {
        method: 'PATCH',
        headers: {
            Authorization: `Token ${userdata.token}`,
        },
        body: formD,
    });
    if (response.status === 400) {
        response = await response.json();
        return response;
    }
    response = await response.json();
    return true;
};

export const ChangePasswordAction = data => async (dispatch) => {
    const userdata = JSON.parse(Cookies.get(UserConstants.USER));
    let response = await fetch(`${UserActionConstants.API_BASE_URL}api/users/change-password/`, {
        method: 'PATCH',
        headers: {
            Authorization: `Token ${userdata.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok && response.status === 400) {
        response = await response.json();
        dispatch({
            type: FlashMessageConstants.SUCCESS,
            message: 'Old Password Incorrect',
        });
        return response;
    }
    response = await response.json();
    dispatch({
        type: FlashMessageConstants.SUCCESS,
        message: 'Password Changed Successfully',
    });
    return true;
};

export const fetchProfileAction = () => async (dispatch) => {
    const userdata = JSON.parse(Cookies.get(UserConstants.USER));
    const response = await fetch(`${UserActionConstants.API_BASE_URL}api/users/`, {
        method: 'GET',
        headers: {
            Authorization: `Token ${userdata.token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok && response.status === 400) {
        return false;
    }
    const data = await response.json();
    dispatch({
        type: UserActionConstants.FETCH_PROFILE,
        payload: data,
    });
    return true;
};
export const passwordResetAction = (data, id, token) => async (dispatch) => {
    let response = await fetch(`${UserActionConstants.API_BASE_URL}api/password-reset/confirm/${id}/${token}/`, {
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
            message: UserConstants.INVALID_TOKEN_MESSAGE,
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

export const tokenvalidation = (id, token) => async (dispatch) => {
    let response = await fetch(`${UserActionConstants.API_BASE_URL}api/password-reset/verify/${id}/${token}/`, {
        method: 'GET',
    });
    if (response.status === 404) {
        dispatch({
            type: UserActionConstants.RESPONSE,
            message: 'failure',
        });
        return false;
    }
    response = await response.json();
    if (response.status === 200) {
        dispatch({
            type: UserActionConstants.RESPONSE,
            message: 'success',
        });
        return true;
    }
    dispatch({
        type: UserActionConstants.RESPONSE,
        message: 'failure',
    });
    return false;
};

export const passwordResetRequestAction = (data) => async (dispatch) => {
    let response = await fetch(`${UserActionConstants.API_BASE_URL}api/password-reset/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    response = await response.json();
    dispatch({
        type: FlashMessageConstants.SUCCESS,
        message: 'Password reset Link has been sent to your registered email id',
    });
    return true;
};

export const logout = (token = 'valid') => (dispatch) => {
    Cookies.remove(UserConstants.USER);
    if (token === 'valid') {
        dispatch({
            type: FlashMessageConstants.SUCCESS,
            message: 'Logged Out Successfully',
        });
    } else {
        dispatch({
            type: FlashMessageConstants.SUCCESS,
            message: 'Please Login Again',
        });
    }
};
