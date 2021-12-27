import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Slider, Login, Signup, Product, AddProduct } from "./components"
const MainRouter = () => {

    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Slider />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="/products" element={<Product />} />
                    <Route exact path="/addproduct" element={<AddProduct />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default MainRouter