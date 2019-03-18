import { combineReducers } from 'redux';

import requestItem from './RequestItem';
import auth from './UserReducers';
import flashmessage from './FlashMessageReducer';

export default combineReducers({
    auth,
    requestItem,
    flashmessage,
});

