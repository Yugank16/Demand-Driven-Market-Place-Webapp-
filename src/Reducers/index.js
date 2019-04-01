import { combineReducers } from 'redux';

import auth from './UserReducers';
import bid from './BidReducers';
import requestItem from './RequestItem';
import flashmessage from './FlashMessageReducer';

export default combineReducers({
    auth,
    bid,
    requestItem,
    flashmessage,
});

