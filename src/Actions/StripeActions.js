import { StripeApi } from '../Constants';

export const PaymentTokenAction = (token) => (dispatch) => {
    dispatch({
        type: StripeApi.ITEM_STRIPE_TOKEN,
        payload: token,
    });
};
