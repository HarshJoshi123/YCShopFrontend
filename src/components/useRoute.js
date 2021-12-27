import { useNavigate } from 'react-router-dom';

function useRoute() {
	const navigate = useNavigate();

	const landing = () => navigate('/')
	const logout = () => navigate('/')
	const login = () => navigate('/login')
	const signup = () => navigate("/signup")
	const products = () => navigate("/products")
	const addproduct = () => navigate("/addproduct");
	return {
		landing,
		login,
		signup,
		logout,
		products,
		addproduct
	}
}

export default useRoute