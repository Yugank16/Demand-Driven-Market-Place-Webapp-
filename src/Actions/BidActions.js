import { UserActionConstants, BidConstants, FlashMessageConstants } from '../Constants/index';
import { fetchUrl } from '../Util/Apiutil';
import { API } from '../Constants/Urls';

export const postBid = (data, id) => async (dispatch) => {
    const formD = new FormData();
    formD.append('bid_price', data.bid_price);
    formD.append('description', data.description);
    for (let i = 0; i < data.images.length; i++) {
        formD.append('images[' + i + ']', data.images[i]);
    }
    data = formD;
    let response = await fetchUrl(`${API.ITEM_REQUEST}${id}/bid/`, 'POST', data, '');
    if (!response.ok && response.status === 400) {
        response = await response.json();
        return response;
    } else if (response.ok) {
        dispatch({
            type: FlashMessageConstants.SUCCESS,
            message: 'Bid Posted Successfully',
        });
        return true;
    } else if (response.status === 403 || response.status === 404) {
        return 'forbidden';
    }
    dispatch({
        type: FlashMessageConstants.FAILURE,
        message: 'Something Went Wrong',
    });
    return false;
};

export const bidDetails = (id) => async (dispatch) => {
    dispatch({
        type: BidConstants.LOADING_TRUE,
    });
    let response = await fetchUrl(`${API.BID_DEATILS}${id}/`, 'GET');

    if (response.ok) {
        response = await response.json();
        let user = await fetchUrl(`${API.USER}`, 'GET');
        user = await user.json();
        if (user.id === response.item.requester.id) {
            response.flag = true;
        } else {
            response.flag = false;
        }
        dispatch({
            type: BidConstants.FETCH_PARTICULAR_BID,
            payload: response,
        });
        return true;
    } else if (response.status === 403 || response.status === 404) {
        dispatch({
            type: BidConstants.ERRORS,
            error: 'forbidden',
        });
        return false;
    }
    dispatch({
        type: FlashMessageConstants.FAILURE,
        message: 'Something Went Wrong',
    });
    return false;
};

export const allBids = (id) => async (dispatch) => {
    dispatch({
        type: BidConstants.LOADING_TRUE,
    });
    let response = await fetchUrl(`${API.ITEM_REQUEST}${id}/bid`, 'GET');
    if (response.ok) {
        response = await response.json(); 
        dispatch({
            type: BidConstants.FETCH_ALL_BIDS,
            payload: response,
        });
        return true;
    } else if (response.status === 403 || response.status === 404) {
        dispatch({
            type: BidConstants.ERRORS,
            error: 'forbidden',
        });
        return false;
    }
    dispatch({
        type: FlashMessageConstants.FAILURE,
        message: 'Something Went Wrong',
    });
    return false;
};

export const myBids = () => async (dispatch) => {
    dispatch({
        type: BidConstants.LOADING_TRUE,
    });
    let response = await fetchUrl(`${API.MY_BIDS}`, 'GET');
    if (response.ok) {
        response = await response.json(); 
        dispatch({
            type: BidConstants.FETCH_MY_BIDS,
            payload: response,
        });
        return true;
    } else if (response.status === 403 || response.status === 404) {
        dispatch({
            type: BidConstants.ERRORS,
            error: 'forbidden',
        });
        return false;
    }
    dispatch({
        type: FlashMessageConstants.FAILURE,
        message: 'Something Went Wrong',
    });
    return false;
};

export const updateBidValidity = async (data, id) => {
    const response = await fetchUrl(`${API.BID_DEATILS}${id}/`, 'PATCH', data);
    if (response.ok) {
        return true;
    }
    return false;
};

export const deleteBid = (id) => async (dispatch) => {
    const response = await fetchUrl(`${API.BID_DEATILS}${id}/`, 'DELETE');
    if (response.ok) {
        dispatch({
            type: FlashMessageConstants.FAILURE,
            message: 'Bid Was Deleted Successfully',
        });
        return true;
    }

    return false;
};

export const updateBidPrice = async (data, id) => {
    let response = await fetchUrl(`${API.UPDATE_BID_PRICE}${id}/`, 'PATCH', data);
    if (response.ok) {
        return true;
    } else if (!response.ok && response.status === 400) {
        response = await response.json();
        return response;
    }
    return false;
};
