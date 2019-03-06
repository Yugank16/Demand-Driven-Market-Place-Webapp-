import { UserActionConstants, UserConstants } from '../Constants/index';

let token;
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
        console.log(res);
        if (res.status === 400) {
            throw Error("User Credentials not Valid");
        }
        return res.json();
    })
        .then(data => {
            token = `${data.token}`;
            fetch(`${UserActionConstants.API_BASE_URL}api/users/`, {
                method: 'GET',
                headers: {
                    Authorization: `Token ${data.token}`,
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(data => {
                    user = data;
                    user.token = token;
                    localStorage.setItem(UserConstants.USER, JSON.stringify(user));
                    dispatch({
                        type: UserActionConstants.FETCH_LOGIN,
                        payload: user,
                    });
                });
        })
        .catch((err) => alert(err));
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
    })
        .then(data => {
            dispatch({
                type: UserActionConstants.FETCH_SIGNUP,
                payload: data,
            });
        })
        .catch((err) => alert(err));
};

export const logout = () => {
    console.log('hi');
    localStorage.removeItem("user");
    return {
        type: UserActionConstants.AUTH_LOGOUT,
    };
};
