import { combineReducers } from 'redux';

import requestItem from './RequestItem';
import auth from './UserReducers';

export default combineReducers({
    auth,
    requestItem,
}); 

