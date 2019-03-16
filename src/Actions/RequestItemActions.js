import Cookies from 'js-cookie';
import { UserConstants, RequestItemConstants, UserActionConstants, FlashMessageConstants } from '../Constants/index';

export const postRequestAction = (data) => async (dispatch) => {
    const userdata = JSON.parse(Cookies.get(UserConstants.USER));
    let response = await fetch(`${UserActionConstants.API_BASE_URL}api/requests/`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${userdata.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok && response.status === 400) {
        dispatch({
            type: FlashMessageConstants.FAILURE,
            message: 'Oops Something Went Wrong',
        });
        return false;
    }
    response = await response.json();
    dispatch({
        type: RequestItemConstants.POST_ITEM_REQUEST,
        payload: data,
    });
    return true;
};

export const fetchRequestsAction = () => dispatch => {
    const userdata = JSON.parse(Cookies.get(UserConstants.USER));
    fetch(`${UserActionConstants.API_BASE_URL}api/requests/`, {
        method: 'GET',
        headers: {
            Authorization: `Token ${userdata.token}`,
        },
    }).then(res => res.json())
        .then(data => {
            dispatch({
                type: RequestItemConstants.FETCH_ALL_REQUEST,
                payload: data,
            });
        });
};

export const fetchDetailsAction = (id) => dispatch => {
    const userdata = JSON.parse(Cookies.get(UserConstants.USER));
    fetch(`${UserActionConstants.API_BASE_URL}api/request-details/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Token ${userdata.token}`,
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
        .then(data => {
            dispatch({
                type: RequestItemConstants.FETCH_PARTICULAR_REQUEST,
                payload: data,
            });
        });
};

