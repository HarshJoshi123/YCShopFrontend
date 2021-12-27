import axios from 'axios'
//const URL = 'http://localhost:8080'
const URL = 'https://ycshop.herokuapp.com'

const addproduct = (data) => {
    return axios.post(`${URL}/product/add`, data,
        {
            headers: {
                'Accept': 'application/json'
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