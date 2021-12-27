import  { LOGIN,LOGOUT } from '../types.js';
import {addToCart,subFromCart} from './actions/cart.js'

const ADD_CART = 'ADD_CART';
const SUB_CART = 'SUB_CART';
const DISCARD  = 'DISCARD'
const initialState = {
	userId:null,
    items:[],
    bill:0
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case DISCARD: {
            return { userId:null , items:null , bill:0 } 
		}
       case LOGIN :{
          return {...state , userId : action.data._id}
       }
        case ADD_CART : {
            return addToCart(state,action) 
        }
        case SUB_CART : {
            return  subFromCart(state,action) ;
        }

		default:
			return state;
	}
}

export default reducer;