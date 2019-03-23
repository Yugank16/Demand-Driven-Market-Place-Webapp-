import Cookies from 'js-cookie';
import { UserConstants } from '../Constants';

export const setUser = (response) => {
    Cookies.set(UserConstants.USER, JSON.stringify(response));
};

export const fetchUrl = (URL, METHOD, data, CONTENTTYPE = 'application/json') => {
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
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response)
        .catch((error) => error); 
};
