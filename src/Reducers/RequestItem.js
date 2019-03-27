import { RequestItemConstants } from '../Constants/index';

const initialState = {
    data: {},
    items: [],
    errors: {},
    isLoading: true,
    flag: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
    case RequestItemConstants.POST_ITEM_REQUEST:
        return {
            ...state,
            data: action.payload,
        };
    case RequestItemConstants.LOADING_TRUE:
        return {
            isLoading: true,
        };
    case RequestItemConstants.LOADING_FALSE:
        return {
            isLoading: false,
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
            errors: action.error,
        };
    case RequestItemConstants.FLAG:
        console.log('inreducer', action.flag);
        return {
            flag: action.flag,
        };

    default:
        return state;
    }
}
