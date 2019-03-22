import Cookies from 'js-cookie';
import { UserConstants } from '../Constants';

export const checkUser = () => {
    if (Cookies.get(UserConstants.USER)) {
        return `Token ${JSON.parse(Cookies.get(UserConstants.USER))}`;
    }
    return null;
};

export const setUser = (response) => {
    Cookies.set(UserConstants.USER, JSON.stringify(response));
};

export const fetchUrl = (URL, METHOD, data = {}, CONTENTTYPE = 'application/json') => {
    const token = checkUser();
    console.log(token);
    if (CONTENTTYPE === 'application/json') {
        data = JSON.stringify(data);
    }
    const headers = {
        Authorization: token,
        'Content-Type': CONTENTTYPE,
    };
    const fetchData = {
        method: METHOD,
        body: data,
        headers,
    };
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
