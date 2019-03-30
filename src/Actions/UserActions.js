
import { BrowserRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserActionConstants, UserConstants, FlashMessageConstants } from '../Constants';
import { API } from '../Constants/Urls';
import { fetchUrl, setUser } from '../Util/Apiutil';

let user;

export const usertype = async () => {
    let response = await fetchUrl(`${API.USER}`, 'GET');
    if (response.ok) {
        response = await response.json();
        console.log(response);
        return response.user_type;
    }
    return false;
};

export const loginAction = data => async (dispatch) => {
    let response = await fetchUrl(`${API.LOGIN}`, 'POST', data);
    if (!response.ok && response.status === 400) {
        dispatch({
            type: FlashMessageConstants.FAILURE,
            message: 'User Credentials not Valid',
        });
        return false;
    } else if (response.ok) {
        response = await response.json();
        setUser(response);
        const userType = await usertype();
        localStorage.setItem("userType", userType);
        dispatch({
            type: FlashMessageConstants.SUCCESS,
            message: 'Logged In Successfully',
        });
        return userType;
    }
    dispatch({
        type: FlashMessageConstants.FAILURE,
        message: 'Something Went Wrong',
    });
    return false;
};

export const signupAction = data => async (dispatch) => {
    console.log('here');
    let response = await fetchUrl(`${API.USER}`, 'POST', data);
    console.log(response);
    if (!response.ok && response.status === 400) {
        response = await response.json();
        return response;
    }
    response = await response.json();
    user = {};
    user.token = response.token;
    Cookies.set(UserConstants.USER, JSON.stringify(user));
    localStorage.setItem("userType", response.user_type);
    dispatch({
        type: FlashMessageConstants.SUCCESS,
        message: 'You have successfully signed up',
    });

    const userType = usertype();
    return userType;
};

export const updateProfileAction = data => async (dispatch) => {
    const userdata = JSON.parse(Cookies.get(UserConstants.USER));
    const formD = new FormData();
    Object.entries(data).forEach(([key, value]) => formD.append(key, value));
    let response = await fetch(`${API.USER}`, {
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

export const changePasswordAction = data => async (dispatch) => {
    const userdata = JSON.parse(Cookies.get(UserConstants.USER));
    let response = await fetch(`${API.CHANGE_PASSWORD}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Token ${userdata.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok && response.status === 400) {
        response = response.json();
        dispatch({
            type: FlashMessageConstants.SUCCESS,
            message: 'Old Password Incorrect',
        });
        return response;
    }
    response = response.json();
    dispatch({
        type: FlashMessageConstants.SUCCESS,
        message: 'Password Changed Successfully',
    });
    return true;
};

export const fetchProfileAction = () => async (dispatch) => {
    dispatch({
        type: UserActionConstants.LOADING_TRUE,
    });
    let response = await fetchUrl(`${API.USER}`, 'GET');
    if (!response.ok && response.status !== 400) {
        return false;
    }
    response = await response.json();
    console.log(response);
    dispatch({
        type: UserActionConstants.FETCH_PROFILE,
        payload: response,
    });
    return true;
};
export const passwordResetAction = (data, id, token) => async (dispatch) => {
    let response = await fetch(`${API.PASSWORD_RESET}${id}/${token}/`, {
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
    const response = await fetch(`${API.TOKEN_VALIDATION}${id}/${token}/`, {
        method: 'GET',
    });
    if (response.status === 404) {
        dispatch({
            type: UserActionConstants.RESPONSE,
            message: 'failure',
        });
        return false;
    }
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
    let response = await fetch(`${API.PASSWORD_RESET_REQUEST}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    response = response.json();
    dispatch({
        type: FlashMessageConstants.SUCCESS,
        message: 'Password reset Link has been sent to your registered email id',
    });
    return true;
};

export const logout = () => (dispatch) => {
    Cookies.remove(UserConstants.USER);
    localStorage.removeItem("userType");
    dispatch({
        type: FlashMessageConstants.SUCCESS,
        message: 'Logged Out Successfully',
    });
};

export const logoutinvalid = () => {
    Cookies.remove(UserConstants.USER);
    BrowserRouter.push('/');
};
