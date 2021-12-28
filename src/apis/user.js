import axios from 'axios'
var URL = 'http://localhost:8080'
if(process.env.NODE_ENV != 'development'){
URL = 'https://ycshop.herokuapp.com'
}
const signup = (data)=>{
    return axios.post(`${URL}/signup`,{
        ...data
    })
}

const login = (data)=>{
    return axios.post(`${URL}/login`,{
        ...data
    })
}
export {
    login,
    signup
}