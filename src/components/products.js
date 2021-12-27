import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { getproducts } from '../apis/product'
import EmptyList from './emptyProductList'
import Snack from './snackbar'
import ProductCard from './card'

function Product() {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);
  React.useEffect(async () => {
    try {
      let dt = await getproducts();
      console.log(dt.data.data)
      setData(dt.data.data)
      setErr(null);
    }
    catch (err) {
      setErr({
        message: err.message,
        severity: 'error'
      });
    }
  }, [])

console.log(data)
  return (
    <Grid style={{ padding: '20px' }}>
    { Boolean(err) && (<Snack err={err} setErr={setErr} />)}  
    
      <Grid container spacing={4} >
        {
          data.length == 0 && (<EmptyList/>)
        }
        { data.length > 0 && data.map((product) => (
          <Grid item>
            <ProductCard data={product} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
export default Product