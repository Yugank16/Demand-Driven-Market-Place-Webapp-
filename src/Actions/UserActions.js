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
    let response = await fetch(`${UserActionConstants.API_BASE_URL}api/users/`, {
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

export const logout = () => {
    localStorage.removeItem("user");
    return {
        type: UserActionConstants.AUTH_LOGOUT,
    };
};
