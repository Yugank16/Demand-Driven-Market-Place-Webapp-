import { RequestItemConstants } from '../Constants/index';

const initialState = {
    data: {},
    errors: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
    case RequestItemConstants.POST_ITEM_REQUEST:
        return {
            ...state,
            data: action.payload,
        };
    case RequestItemConstants.FETCH_ALL_REQUEST:
        return {
            ...state,
            data: action.payload,
        };
    case RequestItemConstants.FETCH_PARTICULAR_REQUEST:
        return {
            ...state,
            data: action.payload,
        };
    case RequestItemConstants.ERRORS:
        return {
            errors: action.payload,
        };
    default:
        return state;
    }
}
