import { StripeApi } from '../Constants/index';

const initialState = {
    token: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
    case StripeApi.ITEM_STRIPE_TOKEN:
        return {
            ...state,
            token: action.payload,
        };
    default:
        return state;
    }
}
