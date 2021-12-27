import React, { useState } from 'react'
import { Container, Grid } from '@mui/material'
import { getproducts } from '../apis/product'
import EmptyList from './emptyProductList'
import Snack from './snackbar'
import ProductCard from './card'
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux'

function Product() {
  const [data, setData] = useState([]);
  //const [cartItems,setCartItems ] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const cart = useSelector(state => state.cart);
  React.useEffect(async () => {
    try {
      let dt = await getproducts();
      dt = dt.data.data; // array 
      dt = dt.map(item => {return {...item,quantity : cart.items.find((it)=>it.productId == item._id ) ? cart.items.find((it)=>it.productId == item._id ).quantity : 0 } })
      setData(dt)
      setErr(null);
    }

    catch (err) {
      setErr({
        message: err.message,
        severity: 'error'
      });
    }
    setLoading(false);
  }, [cart])

React.useEffect(()=>{
  setData(data.map(item => {return {...item,quantity : cart.items.find((it)=>it.productId == item._id ) ? cart.items.find((it)=>it.productId == item._id ).quantity : 0 } }))
 
},[cart.bill])


  if (loading) {
    return <CircularProgress style={{ margin: '120px', height: '100px', width: '100px' }} />
  }

  return (
    <Grid style={{ padding: '20px' }}>
      {Boolean(err) && (<Snack err={err} setErr={setErr} />)}

      <Grid container spacing={4} >
        {
          data.length == 0 && (<EmptyList />)
        }
       {/* {cartItems.length > 0 && cartItems.map((product,i) => (
          <Grid key={i} item>
            <ProductCard data={product} cartItem={true} quantity={product.quantity} />
          </Grid>
        ))} */}

        {data.length > 0 && data.map((product,i) => (
          <Grid key={i} item>
            <ProductCard data={product}  />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
export default Product