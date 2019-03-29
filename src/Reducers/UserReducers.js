import { UserActionConstants } from '../Constants/index';

const initialState = {
    user: {},
    token: {},
    message: {},
    isLoading: true,
};

export default function (state = initialState, action) {
    switch (action.type) {
    case UserActionConstants.FETCH_LOGIN:
        return {
            ...state,
            user: action.payload,
        };
    case UserActionConstants.FETCH_SIGNUP:
        return {
            ...state,
            user: action.payload,
        };
    case UserActionConstants.FETCH_PROFILE:
        return {
            ...state,
            user: action.payload,
            isLoading: false,
        };
    case UserActionConstants.AUTH_LOGOUT:
        return {
            token: null,
        };
    case UserActionConstants.RESPONSE:
        return {
            message: action.message,
        };
    default:
        return state;
    }
}
