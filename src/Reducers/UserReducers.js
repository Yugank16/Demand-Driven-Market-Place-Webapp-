import { UserActionConstants } from '../Constants/index';


const initialState = {
    user: {},
    token: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
    case UserActionConstants.FETCH_LOGIN:
        return {
            ...state,
            token: action.payload,
        };
    case UserActionConstants.FETCH_SIGNUP:
        return {
            ...state,
            user: action.payload,
        };
    case UserActionConstants.AUTH_LOGOUT:
        return {
            token: null,
        };
    default:
        return state;
    }
}
