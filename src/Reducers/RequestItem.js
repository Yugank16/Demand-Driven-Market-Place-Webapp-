import { RequestItemConstants } from '../Constants/index';

const initialState = {
    data: {},
    close_bid_data: {},
    items: [],
    errors: {},
    isLoading: true,
    flag: {},
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
            isLoading: false,
            items: action.payload,
        };
    case RequestItemConstants.FETCH_PARTICULAR_REQUEST:
        return {
            ...state,
            isLoading: false,
            data: action.payload,
        };
    case RequestItemConstants.ERRORS:
        return {
            ...state,
            errors: action.error,
        };
    case RequestItemConstants.FLAG:
        return {
            ...state,
            isLoading: false,
            flag: action.flag,
        };
    case RequestItemConstants.BID_CLOSE:
        return {
            ...state,
            close_bid_data: action.payload,
        };

    default:
        return state;
    }
}
