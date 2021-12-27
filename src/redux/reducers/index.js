import user from './user.js'; //available lawyer data
import { combineReducers } from 'redux';

const rootReducer = combineReducers ({
	user : user
});

export default rootReducer;