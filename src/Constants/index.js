export const UserActionConstants = {
    API_BASE_URL: 'http://127.0.0.1:8000/',
    FETCH_LOGIN: 'FETCH_LOGIN',
    FETCH_SIGNUP: 'FETCH_SIGNUP',
    AUTH_LOGOUT: 'AUTH_LOGOUT',
    LOADING_TRUE: 'LOADING_TRUE',
    FETCH_PROFILE: 'FETCH_PROFILE',
    RESPONSE: 'RESPONSE',
};

export const RequestItemConstants = {
    POST_ITEM_REQUEST: 'POST_ITEM_REQUEST',
    FETCH_ALL_REQUEST: 'FETCH_ALL_REQUEST',
    FETCH_PARTICULAR_REQUEST: 'FETCH_PARTICULAR_REQUEST',
    BID_CLOSE: 'BID_CLOSE',
    ERRORS: 'ERRORS',
    LOADING_TRUE: 'LOADING_TRUE',
    LOADING_FALSE: 'LOADING_FALSE',
    

    PENDING: 1,
    LIVE: 2,
    ONHOLD: 3,
    OLD: 3,
    SECOND_HAND: 2,
    NEW: 1,
    ALL: '',
    FLAG: 'FLAG',
    SOLD: 4,
    UNSOLD: 5,
};

export const BidConstants = {
    FETCH_ALL_BIDS: 'FETCH_ALL_BIDS',
    FETCH_MY_BIDS: 'FETCH_MY_BIDS',
    FETCH_PARTICULAR_BID: 'FETCH_PARTICULAR_BID',
    ERRORS: 'ERRORS',
    LOADING_TRUE: 'LOADING_TRUE',
    LOADING_FALSE: 'LOADING_FALSE',
};

export const FlashMessageConstants = {
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
};

export const UserConstants = {
    USER: 'user',
    INVALID_TOKEN_MESSAGE: 'The link you are trying to access has been expired or is invalid',
    BUYER: 1,
    SELLER: 2,
    BOTH: 3,
};

export const REGEX = {
    // eslint-disable-next-line
    EMAIL: new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i),
    Price: new RegExp(/^\d+$/),
};

export const StripeApi = {
    PUBLISH_KEY: 'pk_test_bxHHvaNFRHGDQ6GKLMsixkuI002oVXvQTp',
    ITEM_STRIPE_TOKEN: 'ITEM_STRIPE_TOKEN',
};

export const ItemStatus = [];
ItemStatus[1] = 'LIVE SOON';
ItemStatus[2] = 'LIVE';
ItemStatus[3] = 'ONHOLD';
ItemStatus[4] = 'SOLD';
ItemStatus[5] = 'UNSOLD';
ItemStatus[6] = 'PAYMENT PENDING';
