import  { LOGIN,LOGOUT } from '../types.js';
const initialState = {
	name:null,
    email:null,
    token:null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN: {
            return { name:action.data.name,email:action.data.email,token:action.data.token } ;
		}
       
        case LOGOUT : {
            return {name:null,email:null,token:null};
        }

		default:
			return state;
	}
}

export default reducer;