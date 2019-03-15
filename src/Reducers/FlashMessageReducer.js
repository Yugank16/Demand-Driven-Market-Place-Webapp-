import { FlashMessageConstants } from '../Constants/index';

const initialState = {
    message: '',
    className: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
    case FlashMessageConstants.SUCCESS:
        return {
            message: action.message,
            className: 'alert-success',
        };
    case FlashMessageConstants.FAILURE:
        return {
            message: action.message,
            className: 'alert-failure',
        };
    default:
        return state;
    }
}
