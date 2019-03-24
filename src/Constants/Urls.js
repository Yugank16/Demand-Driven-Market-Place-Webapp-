const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const API = {
    LOGIN: `${API_BASE_URL}/login/`,
    USER: `${API_BASE_URL}/users/`,
    CHANGE_PASSWORD: `${API_BASE_URL}/users/change-password/`,
    PASSWORD_RESET: `${API_BASE_URL}/password-reset/confirm/`,
    TOKEN_VALIDATION: `${API_BASE_URL}/password-reset/verify/`,
    PASSWORD_RESET_REQUEST: `${API_BASE_URL}/password-reset/`,
    ITEM_REQUEST: `${API_BASE_URL}/requests/`,
    MY_REQUEST: `${API_BASE_URL}/my-requests/`,
    REQUEST_DETAILS: `${API_BASE_URL}/request-details/`,
    BID_DEATILS: `${API_BASE_URL}/bid/`,
    MY_BIDS: `${API_BASE_URL}/my-bids/`,   
};
