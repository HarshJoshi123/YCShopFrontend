import { useSelector } from 'react-redux'
import jwt_decode from "jwt-decode";
export const IsAuthenticated = () => {
    const user = useSelector(state => state.user)
    if(!user.token){
        return false;
    }
    let decodedToken = jwt_decode(user.token);
    console.log("Decoded Token", decodedToken);
    let currentDate = new Date();
    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("Token expired.");
        return false
    } else {
        console.log("Valid token");
        return true
    }

}