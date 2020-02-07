import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr'
import user from './user/user'

const rootReducer = combineReducers({
    user,
    toastr: toastrReducer
});

export default rootReducer;