import { BidConstants } from '../Constants/index';

const initialState = {
    data: {},
    bids: [],
    errors: {},
    isLoading: true,
};

export default function (state = initialState, action) {
    switch (action.type) {
    case BidConstants.LOADING_TRUE:
        return {
            isLoading: true,
        };
    case BidConstants.LOADING_FALSE:
        return {
            isLoading: false,
        };
    case BidConstants.FETCH_ALL_BIDS:
        return {
            ...state,
            isLoading: false,
            bids: action.payload,
        };
    case BidConstants.FETCH_MY_BIDS:
        return {
            ...state,
            isLoading: false,
            bids: action.payload,
        };
    case BidConstants.FETCH_PARTICULAR_BID:
        return {
            ...state,
            isLoading: false,
            data: action.payload,
        };
    case BidConstants.ERRORS:
        return {
            errors: action.payload,
        };
    default:
        return state;
    }
}
