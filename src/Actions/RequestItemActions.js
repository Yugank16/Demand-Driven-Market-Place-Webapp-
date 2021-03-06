import Cookies from 'js-cookie';
import axios from 'axios';
import { UserConstants, RequestItemConstants, FlashMessageConstants } from '../Constants';
import { API } from '../Constants/Urls';
import { fetchUrl } from '../Util/Apiutil';

export const postRequestAction = (data) => async (dispatch) => {
    let response = await fetchUrl(`${API.ITEM_REQUEST}`, 'POST', data);
    if (!response.ok && response.status === 400) {
        response = response.json();
        return response;
    } else if (response.ok) {
        dispatch({
            type: FlashMessageConstants.SUCCESS,
            message: 'Item Posted Successfully',
        });
        return true;
    }
    return false;
};

export const updateRequestAction = (id, data) => async (dispatch) => {
    let response = await fetchUrl(`${API.ITEM_UPDATE}${id}/`, 'PATCH', data);
    if (!response.ok && response.status === 400) {
        response = await response.json();
        return response;
    } else if (response.ok) {
        dispatch({
            type: FlashMessageConstants.SUCCESS,
            message: 'Item Updated Successfully',
        });
        return true;
    }
    return false;
};

export const fetchRequestsAction = (nameParam, itemStatus, orderBy) => (dispatch) => {
    dispatch({
        type: RequestItemConstants.LOADING_TRUE,
    });
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
    }).catch(err => {
        if (!err.response) {
            return;
        }
        if (err.response.status === 403 || err.response.status === 404) {
            dispatch({
                type: RequestItemConstants.ERRORS,
                error: 'forbidden',
            });
        }
        dispatch({
            type: RequestItemConstants.FETCH_ALL_REQUEST,
            payload: 'Something Went Wrong!',
        });
    });
};

export const fetchMyRequestsAction = (nameParam, itemStatus, orderBy) => dispatch => {
    dispatch({
        type: RequestItemConstants.LOADING_TRUE,
    });
    const userdata = JSON.parse(Cookies.get(UserConstants.USER));
    axios.get(`${API.MY_REQUEST}`, {
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
    }).catch(err => {
        if (!err.response) {
            return;
        }
        if (err.response.status === 403 || err.response.status === 404) {
            dispatch({
                type: RequestItemConstants.ERRORS,
                error: 'forbidden',
            });
        }
        dispatch({
            type: RequestItemConstants.FETCH_ALL_REQUEST,
            payload: 'Something Went Wrong!',
        });
    });
};

export const fetchDetailsAction = (id) => async (dispatch) => {
    dispatch({
        type: RequestItemConstants.LOADING_TRUE,
    });
    let response = await fetchUrl(`${API.REQUEST_DETAILS}${id}`, 'GET');
    if (response.ok) {
        response = await response.json();
        if (response.item_status === RequestItemConstants.SOLD) {
            let soldbid = await fetchUrl(`${API.ITEM_REQUEST}${id}/sold/`, 'GET');
            soldbid = await soldbid.json();
            const seller = soldbid[0];
            response.soldbid = seller;
        }
        if (response.item_status === RequestItemConstants.SOLD || response.item_status === RequestItemConstants.UNSOLD) {
            dispatch({
                type: RequestItemConstants.FETCH_PARTICULAR_REQUEST,
                payload: response,
            });
            return true;
        }      
        let user = await fetchUrl(`${API.USER}`, 'GET');
        let bid = await fetchUrl(`${API.ITEM_REQUEST}${id}/check-bid/`, 'GET');
        bid = await bid.json();
        user = await user.json();
        if (user.id === response.requester.id) {
            response.flag = true;
        } else {
            response.flag = false;
        }
        if (bid.length > 0) {
            response.bidId = bid[0].id;
        }
        dispatch({
            type: RequestItemConstants.FETCH_PARTICULAR_REQUEST,
            payload: response,
        });
        return true;
    } else if (response.status === 403 || response.status === 404) {
        dispatch({
            type: RequestItemConstants.ERRORS,
            error: 'forbidden',
        });
        return false;
    }
    return false;
};

export const canBidAction = (id) => async (dispatch) => {
    const flag = {};
    const response = await fetchUrl(`${API.REQUEST_DETAILS}${id}`, 'GET');
    let bid = await fetchUrl(`${API.ITEM_REQUEST}${id}/check-bid/`, 'GET');
    if (response.ok) {
        const data = await response.json();
        let user = await fetchUrl(`${API.USER}`, 'GET');
        user = await user.json();
        bid = await bid.json();
        if (bid.length > 0) {
            response.bidId = bid[0].id;
            flag.id = bid[0].id;
        }
        if (user.id === data.requester.id || data.item_status !== 2 || user.user_type === 1) {
            flag.value = false;
        } else {
            flag.value = true;
        }
    }
    if (response.status === 403 || response.status === 404 || !flag) {
        flag.value = false;
    } else {
        flag.value = true;
    }
    dispatch({
        type: RequestItemConstants.FLAG,
        flag,
    });
    return true;
};

export const deleteItemAction = (id) => async (dispatch) => {
    const response = await fetchUrl(`${API.ITEM_DELETE}${id}/`, 'DELETE');
    if (response.ok) {
        dispatch({
            type: FlashMessageConstants.SUCCESS,
            message: 'Item Deleted Successfully',
        });
        return true;
    }
    return false;
};


export const bidClose = (data, id) => async (dispatch) => {
    let response = await fetchUrl(`${API.REQUEST_DETAILS}${id}/`, 'PATCH', data);
    if (response.ok) {
        response = await response.json();
        dispatch({
            type: RequestItemConstants.BID_CLOSE,
            payload: response,
        });  
        return true; 
    }   
    dispatch({
        type: FlashMessageConstants.SUCCESS,
        message: 'Something went wrong',
    });
    return false;
};
