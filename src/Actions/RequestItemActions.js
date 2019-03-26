import Cookies from 'js-cookie';
import axios from 'axios';
import { UserConstants, RequestItemConstants, UserActionConstants } from '../Constants';
import { API } from '../Constants/Urls';
import { fetchUrl, setUser } from '../Util/Apiutil';

export const postRequestAction = (data) => async (dispatch) => {
    const userdata = JSON.parse(Cookies.get(UserConstants.USER));
    let response = await fetch(`${API.ITEM_REQUEST}`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${userdata.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok && response.status === 400) {
        response = response.json();
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

export const fetchRequestsAction = (nameParam, itemStatus, orderBy) => dispatch => {
    const userdata = JSON.parse(Cookies.get(UserConstants.USER));
    axios.get(`${API.ITEM_REQUEST}`, {
        headers: {
            Authorization: `Token ${userdata.token}`,
        },
        params: {
            name: nameParam,
            item_status: itemStatus,
            ordering: orderBy,
        },
    }).then(res => {
        dispatch({
            type: RequestItemConstants.FETCH_ALL_REQUEST,
            payload: res.data,
        });
    });
};

export const fetchMyRequestsAction = (nameParam) => dispatch => {
    const userdata = JSON.parse(Cookies.get(UserConstants.USER));
    axios.get(`${API.MY_REQUEST}`, {
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

export const fetchDetailsAction = (id) => async (dispatch) => {
    let response = await fetchUrl(`${API.REQUEST_DETAILS}${id}`, 'GET', dispatch);
    let user = await fetchUrl(`${API.USER}`, 'GET', dispatch);
    if (response.ok && user.ok) {
        response = await response.json();
        user = await user.json();
        if (user.id === response.requester.id) {
            response.flag = true;
        } else {
            response.flag = false;
        }
        dispatch({
            type: RequestItemConstants.FETCH_PARTICULAR_REQUEST,
            payload: response,
        });
    }     
};
