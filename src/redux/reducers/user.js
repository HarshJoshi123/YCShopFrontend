import  { LOGIN,LOGOUT } from '../types.js';
const initialState = {
	name:null,
    email:null,
    token:null,
	_id:null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN: {
            return { name:action.data.name,email:action.data.email,token:action.data.token,_id:action.data._id } ;
		}
       
        case LOGOUT : {
            return {name:null,email:null,token:null};
        }

		default:
			return state;
	}
}

export default reducer;