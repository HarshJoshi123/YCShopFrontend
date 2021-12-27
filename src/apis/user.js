import axios from 'axios'
//const URL = 'http://localhost:8080'
const URL = 'https://ycshop.herokuapp.com'
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