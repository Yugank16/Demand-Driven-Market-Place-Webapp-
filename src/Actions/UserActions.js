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

export const updateProfileAction = data => async (dispatch) => {
    const userdata = JSON.parse(localStorage.getItem('user'));
    const formD = new FormData();
    Object.entries(data).forEach(([key, value]) => formD.append(key, value));
    for (const key of formD.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
    let response = await fetch(`${UserActionConstants.API_BASE_URL}api/users/`, {
        method: 'PATCH',
        headers: {
            Authorization: `Token ${userdata.token}`,
        },
        body: formD,
    });
    if (response.status === 400) {
        response = await response.json();
        console.log('hello', response);
        return false;
    }
    response = await response.json();
    return true;
};

export const ChangePasswordAction = data => async (dispatch) => {
    const userdata = JSON.parse(localStorage.getItem('user'));
    let response = await fetch(`${UserActionConstants.API_BASE_URL}api/users/change-password/`, {
        method: 'PATCH',
        headers: {
            Authorization: `Token ${userdata.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok && response.status === 400) {
        return false;
    }
    response = await response.json();
    return true;
};

export const fetchProfileAction = () => async (dispatch) => {
    const userdata = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`${UserActionConstants.API_BASE_URL}api/users/`, {
        method: 'GET',
        headers: {
            Authorization: `Token ${userdata.token}`,
            'Content-Type': 'application/json',
        },
    });
    console.log('in actions');
    if (!response.ok && response.status === 400) {
        return false;
    }
    const data = await response.json();
    console.log('in actions down=', data);
    dispatch({
        type: UserActionConstants.FETCH_PROFILE,
        payload: data,
    });
    return true;
};


export const passwordResetAction = (data, id, token) => async (dispatch) => {
    let response = await fetch(`${UserActionConstants.API_BASE_URL}api/password_reset/confirm/${id}/${token}/`, {
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
