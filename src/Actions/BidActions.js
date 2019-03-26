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
    let response = await fetchUrl(`${API.ITEM_REQUEST}${id}/bid/`, 'POST', dispatch, data, '');
    if (!response.ok && response.status === 400) {
        response = await response.json();
        console.log(response);
        dispatch({
            type: FlashMessageConstants.FAILURE,
            message: 'Check the input Fields',
        });
        return response;
    } else if (response.ok) {
        dispatch({
            type: FlashMessageConstants.SUCCESS,
            message: 'Bid Posted Successfully',
        });
        return true;
    }
    dispatch({
        type: FlashMessageConstants.FAILURE,
        message: 'Something Went Wrong',
    });
    return false;
};

export const bidDetails = (id) => async (dispatch) => {
    let response = await fetchUrl(`${API.BID_DEATILS}${id}/`, 'GET', dispatch);
    if (response.ok) {
        response = await response.json(); 
        dispatch({
            type: BidConstants.FETCH_PARTICULAR_BID,
            payload: response,
        });
        return true;
    }
    dispatch({
        type: FlashMessageConstants.FAILURE,
        message: 'Something Went Wrong',
    });
    return false;
};

export const loadingTrueAction = () => dispatch => {
    dispatch({
        type: BidConstants.LOADING_TRUE,
    });
};

export const loadingFalseAction = () => dispatch => {
    dispatch({
        type: BidConstants.LOADING_FALSE,
    });
};

export const allBids = (id) => async (dispatch) => {
    let response = await fetchUrl(`${API.ITEM_REQUEST}${id}/bid`, 'GET', dispatch);
    if (response.ok) {
        response = await response.json(); 
        dispatch({
            type: BidConstants.FETCH_ALL_BIDS,
            payload: response,
        });
        return true;
    }
    dispatch({
        type: FlashMessageConstants.FAILURE,
        message: 'Something Went Wrong',
    });
    return false;
};

export const myBids = () => async (dispatch) => {
    let response = await fetchUrl(`${API.MY_BIDS}`, 'GET', dispatch);
    if (response.ok) {
        response = await response.json(); 
        dispatch({
            type: BidConstants.FETCH_MY_BIDS,
            payload: response,
        });
        return true;
    }
    dispatch({
        type: FlashMessageConstants.FAILURE,
        message: 'Something Went Wrong',
    });
    return false;
};
