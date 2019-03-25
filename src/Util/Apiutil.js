import Cookies from 'js-cookie';
import { UserConstants, FlashMessageConstants } from '../Constants';
import { logoutinvalid } from '../Actions/UserActions';

export const setUser = (response) => {
    Cookies.set(UserConstants.USER, JSON.stringify(response));
};

export const fetchUrl = (URL, METHOD, dispatch, data, CONTENTTYPE = 'application/json') => {
    let userdata;
    if (Cookies.get(UserConstants.USER)) {
        userdata = JSON.parse(Cookies.get(UserConstants.USER));
        userdata = `Token ${userdata.token}`;
    }   
    let headers;
    if (CONTENTTYPE === 'application/json') {
        data = JSON.stringify(data);
        headers = {
            Authorization: userdata,
            'Content-Type': CONTENTTYPE,
        };
    } else {
        headers = {
            Authorization: userdata,
        };
    }
    
    const fetchData = {
        method: METHOD,
        headers,
    };
    if (data) {
        fetchData.body = data;
    }
    return fetch(URL, fetchData)
        .then((response) => {
            if (!response.ok && response.status !== 400) {
                console.log(response.status);
                if (response.status === 401) {
                    logoutinvalid(dispatch);
                    console.log('inside', response.status);
                    return false;
                } else if (response.status === 403) {
                    dispatch({
                        type: FlashMessageConstants.FAILURE,
                        message: 'You Don\'t have permission to perform this action',
                    });
                    return false;
                } 
                dispatch({
                    type: FlashMessageConstants.FAILURE,
                    message: 'Something Went Wrong!',
                });
                return false;
            }
            return response;
        })
        .then(response => response);
};
