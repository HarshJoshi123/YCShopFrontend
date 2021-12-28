import axios from 'axios'

const URL = 'http://localhost:8080'
if (process.env.NODE_ENV != 'development') {
    URL = 'https://ycshop.herokuapp.com'
}
const makeorder = (data,token) => {
    return axios.post(`${URL}/order/create`, data,{
        headers:{
            'authorization':token
        }
    })
}

export {
    makeorder
}