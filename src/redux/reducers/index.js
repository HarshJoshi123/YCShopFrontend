import user from './user.js'; //available lawyer data
import cart from './cart.js'
import { combineReducers } from 'redux';

const rootReducer = combineReducers ({
	user : user,
	cart : cart
});

export default rootReducer;