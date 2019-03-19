import Cookies from 'js-cookie';
import axios from "axios";
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
        response = await response.json();
        return response;
    }
    dispatch({
        type: RequestItemConstants.POST_ITEM_REQUEST,
        payload: data,
    });
    return true;
};

export const loadingTrueAction = () => dispatch => {
    dispatch({
        type: RequestItemConstants.LOADING_TRUE,
    });
};

export const loadingFalseAction = () => dispatch => {
    dispatch({
        type: RequestItemConstants.LOADING_FALSE,
    });
};

export const fetchRequestsAction = (nameParam) => dispatch => {
    const userdata = JSON.parse(Cookies.get(UserConstants.USER));
    axios.get(`${UserActionConstants.API_BASE_URL}api/requests/`, {
        headers: {
            Authorization: `Token ${userdata.token}`,
        },
        params: {
            name: nameParam,
        },
    }).then(res => {
        dispatch({
            type: RequestItemConstants.FETCH_ALL_REQUEST,
            payload: res.data,
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

