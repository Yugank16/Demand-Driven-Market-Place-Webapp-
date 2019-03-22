import { UserActionConstants, UserConstants, FlashMessageConstants } from '../Constants/index';
import { fetchUrl, setUser } from '../Util/Apiutil';

let user;

export const postBid = (data, id) => async (dispatch) => {
    let response = await fetchUrl(`${UserActionConstants.API_BASE_URL}api/request/${id}/bid/`, 'POST', data, '');
    if (!response.ok && response.status === 400) {
        dispatch({
            type: FlashMessageConstants.FAILURE,
            message: 'Check the input Fields',
        });
        return false;
    } else if (response.ok) {
        response = await response.json();
        setUser(response);
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

