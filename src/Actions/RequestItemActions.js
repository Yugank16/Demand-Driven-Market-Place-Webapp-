import { RequestItemConstants, UserActionConstants, FlashMessageConstants } from '../Constants/index';

export const postRequestAction = (data) => dispatch => {
    const userdata = JSON.parse(localStorage.getItem('user'));
    return fetch(`${UserActionConstants.API_BASE_URL}api/items/`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${userdata.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => res.json())
        .then(data => {
            dispatch({
                type: RequestItemConstants.POST_ITEM_REQUEST,
                payload: data,
            });
        })
        .catch((err) => {
            dispatch({
                type: FlashMessageConstants.FAILURE,
                message: err,
            });
        });
};

export const fetchRequestsAction = () => dispatch => {
    const userdata = JSON.parse(localStorage.getItem('user'));
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
    const userdata = JSON.parse(localStorage.getItem('user'));
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

