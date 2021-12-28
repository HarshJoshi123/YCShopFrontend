import { BrowserRouter, Routes, Route,Outlet,Navigate } from 'react-router-dom';
import { Navbar, Slider, Login, Signup, Product, AddProduct, Checkout } from "./components"
import { useSelector } from 'react-redux';
import { IsAuthenticated } from './utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
   
    return IsAuthenticated() ? <Outlet /> : <Navigate to="/login" />
};


const MainRouter = () => {

    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Slider />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    
                    <Route exact path='/' element={<PrivateRoute />}>
                        <Route exact path="/addproduct" element={<AddProduct />} />
                        <Route exact path="/checkout" element={< Checkout />} />
                        <Route exact path="/products" element={<Product />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default MainRouter