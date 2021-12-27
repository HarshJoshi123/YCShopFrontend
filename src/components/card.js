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

export default function ProductCard({ data }) {
  console.log(data)
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
        <Typography variant="body2" color="text.secondary">
          {data.description ? data.description : ''}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">ADD TO CART</Button>
      </CardActions>
    </Card>
  );
}