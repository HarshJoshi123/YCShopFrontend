import axios from 'axios'
var URL = 'http://localhost:8080'
if(process.env.NODE_ENV != 'development'){
URL = 'https://ycshop.herokuapp.com'
}
const addproduct = (data,token) => {
    return axios.post(`${URL}/product/add`, data,
        {
            headers: {
                'Accept': 'application/json',
                'authorization': token
            }
        }
    )
}

const getproducts = () => {
    return axios.get(`${URL}/product/all`)
}
const getproductpic = (id) => `${URL}/product/pic/${id}`

export {
    addproduct,
    getproducts,
    getproductpic
}