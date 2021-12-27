import * as React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    Tooltip,
    MenuItem,
    Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux'
import useRoute from './useRoute';
import GroupedButtons from './navbar/groupedButton';
import { connection } from 'mongoose';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
    //consist of cart and logout c
    const dispatch = useDispatch();
    const route = useRoute()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElCart, setAnchorElCart] = React.useState(null);
    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenCartMenu = (event) => {
        setAnchorElCart(event.currentTarget);
    };
    const handleCloseCartMenu = () => {
        setAnchorElCart(null);
    };

    const userMenu = (name) => (
        <>
            <Tooltip title="See cart">
                <IconButton onClick={handleOpenCartMenu} sx={{ p: 0 }}>
                    <ShoppingCartIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mx: 2 }}>
                    <Avatar>{name[0]}</Avatar>
                </IconButton>
            </Tooltip>
        </>
    )

    const handleChange = (val,prod) => {
        //1 or -1 
        console.log(val,prod)
        if (val == 1) {
            dispatch({
                type: 'ADD_CART',
                data: {
                    name: prod.name,
                    _id: prod._id,
                    quantity: prod.quantity || 0,
                    cost: prod.cost,
                }
            })
        }
        else {
            dispatch({
                type: 'SUB_CART',
                data: {
                    name: prod.name,
                    _id: prod._id,
                    quantity: prod.quantity || 0,
                    cost: prod.cost,
                }
            })
        }
    }

    const LoginMenu = () => (
        <>
            <Tooltip title="Login to you account">
                <Button style={{ color: 'black' }} onClick={() => route.login()} sx={{ p: 0, mx: 2 }}>
                    LOGIN
                </Button>
            </Tooltip>
            <Tooltip title="Signup !">
                <Button style={{ color: 'black' }} onClick={() => route.signup()} sx={{ p: 0, mx: 2 }}>
                    SIGNUP
                </Button>
            </Tooltip>
        </>
    )
    const Logout = () => {
        handleCloseUserMenu();
        dispatch({
            type: 'LOGOUT'
        });
        route.logout();
    }
 
    return (
        <AppBar position="static" style={{ backgroundColor: 'transparent', color: 'black ' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        onClick={() => route.landing()}
                        style={{ cursor: 'pointer' }}
                        sx={{ mr: 5, display: { xs: 'none', md: 'flex' } }}
                    >
                        YCSHOP
                    </Typography>


                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                            <MenuItem onClick={() => { handleCloseNavMenu(); route.products() }} >
                                <Typography textAlign="center">Products</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { handleCloseNavMenu(); route.addproduct() }}>
                                <Typography textAlign="center">Add Product</Typography>
                            </MenuItem>

                            {/* <MenuItem onClick={handleCloseNavMenu} >
                                <Typography textAlign="center"> PROFILE </Typography>
                            </MenuItem>
                            <MenuItem onClick={Logout} >
                                <Typography textAlign="center"> LOGOUT </Typography>
                            </MenuItem> */}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        <Button
                            //key={page}
                            onClick={() => { handleCloseNavMenu(); route.products() }}
                            sx={{ my: 2, color: 'black', display: 'block' }}
                        >
                            Products
                        </Button>
                        <Button
                            //key={page}
                            onClick={() => { handleCloseNavMenu(); route.addproduct() }}
                            sx={{ my: 2, color: 'black', display: 'block' }}
                        >
                            ADD PRODUCT
                        </Button>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {user.token ? userMenu(user.name) : LoginMenu()}
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElCart}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElCart)}
                            onClose={handleCloseCartMenu}
                        >
                            {/* <MenuItem onClick={Logout} disabled style={{ textAlign: 'center' }} >
                                <Typography textAlign="center"  style={{ textAlign: 'center' }}>  </Typography>
                            </MenuItem> */}
                            {
                                cart.items.map((item) =>
                                (<MenuItem >
                                    <div>
                                        {item.name} <GroupedButtons qty={item.quantity} handleChange={(i)=>handleChange(i,item)} />
                                    </div>
                                </MenuItem>
                                ))}
                        </Menu>

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={Logout} >
                                <Typography textAlign="center"> Logout </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;