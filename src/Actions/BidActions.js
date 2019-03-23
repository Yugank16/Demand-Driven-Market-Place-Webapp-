import { UserActionConstants, BidConstants, FlashMessageConstants } from '../Constants/index';
import { fetchUrl } from '../Util/Apiutil';

export const postBid = (data, id) => async (dispatch) => {
    const formD = new FormData();
    formD.append('bid_price', data.bid_price);
    formD.append('description', data.description);
    for (let i = 0; i < data.images.length; i++) {
        formD.append('images[' + i + ']', data.images[i]);
    }
    data = formD;
    let response = await fetchUrl(`${UserActionConstants.API_BASE_URL}api/request/${id}/bid/`, 'POST', data, '');
    if (!response.ok && response.status === 400) {
        response = await response.json();
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
    let response = await fetchUrl(`${UserActionConstants.API_BASE_URL}api/bid/${id}/`, 'GET');
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

