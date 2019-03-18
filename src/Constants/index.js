export const UserActionConstants = {
    API_BASE_URL: 'http://127.0.0.1:8000/',
    FETCH_LOGIN: 'FETCH_LOGIN',
    FETCH_SIGNUP: 'FETCH_SIGNUP',
    AUTH_LOGOUT: 'AUTH_LOGOUT',
    FETCH_PROFILE: 'FETCH_PROFILE',
    RESPONSE: 'RESPONSE',
};

export const RequestItemConstants = {
    POST_ITEM_REQUEST: 'POST_ITEM_REQUEST',
    FETCH_ALL_REQUEST: 'FETCH_ALL_REQUEST',
    FETCH_PARTICULAR_REQUEST: 'FETCH_PARTICULAR_REQUEST',
    ERRORS: 'ERRORS',
};

export const FlashMessageConstants = {
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
};

export const UserConstants = {
    USER: 'user',
    INVALID_TOKEN_MESSAGE: 'The link you are trying to access has been expired or is invalid',

};

export const REGEX = {
    EMAIL: new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i),
};
