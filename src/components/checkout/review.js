import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {useSelector } from 'react-redux'

import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import PaymentForm from './form';

const PUBLIC_KEY = "pk_test_51KBZ5oSGJi7bktEYwbGaBLZS2zMLjOUQtwM3L3utJScIUlcDIoQ0uA6jwTTyzlCOzMu1ulYW0cGGwBFvEZTXAGjW00YOHrAUg6"

export  function StripeContainer(paid,setPaid){
    const [stripe,setStripe] = React.useState('');

    React.useEffect(async ()=>{    
    const st = await loadStripe(PUBLIC_KEY);
    setStripe(st);
 },[])
 if(stripe == ''){
     return <div>LOADING ..... </div>
 }  

 return( 
   <Elements stripe={stripe}>
      <PaymentForm paid={paid} setPaid={setPaid}/> 
   </Elements>
   )
}



const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const getSymbol = (str) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
};

export default function Review({address,paid,setPaid}) {

const cart = useSelector(state => state.cart);
console.log(paid,setPaid)
    return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.items.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.product} />
            <Typography variant="body2">{product.cost}{getSymbol('&#8377')}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {cart.bill}{getSymbol('&#8377')}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{address.fname} {address.lname}</Typography>
          <Typography gutterBottom>{address.address1}</Typography>
          <Typography gutterBottom>{address.address2}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={12} style={{width:'100%'}}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container >
            <StripeContainer paid={paid} setPaid={setPaid} />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}