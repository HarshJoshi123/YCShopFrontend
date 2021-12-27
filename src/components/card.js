import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {getproductpic} from '../apis/product'
import { useDispatch } from 'react-redux';
import GroupedButtons from './navbar/groupedButton';

export default function ProductCard({ data}) {
  
  const dispatch = useDispatch();
 
 const handleChange = (val)=>{
    //1 or -1 
    if( val==1 ){
        dispatch({type:'ADD_CART',
          data:{
            name:data.name,
            _id:data._id,
            quantity:data.quantity || 0,
            cost : data.cost,
          }})
     }
     else{
      dispatch({type:'SUB_CART',
        data:{
          name:data.name,
          _id:data._id,
          quantity:data.quantity || 0,
          cost : data.cost,
        }
      })
     }
  }
 
 
  return (
    <Card sx={{ minWidth: 345,minHeight:350 }}>
      <CardMedia
        component="img"
        height="200"
        image={getproductpic(data._id)}
        alt="Couldn't fetch image"
      />
      <CardContent>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography variant="h5" color="text.primary">
            {data.cost} <CurrencyRupeeIcon/>
          </Typography>
        </div>


        <Typography variant="body2" color="text.primary">
          <Stack direction="row" spacing={1}>
            <Chip label={data.product} />
            <Chip label={data.category} variant="outlined" />
          </Stack>
        </Typography>
       
      </CardContent>
      <CardActions>
        <GroupedButtons qty={data.quantity } handleChange={handleChange} />
      </CardActions>
    </Card>
  );
}