import { Container, Typography, Stack, Button } from '@mui/material'
import useRoute  from './useRoute'
const EmptyList = () => {
    const route = useRoute();
    return (
    <Container maxWidth="sm" style={{marginTop:'30px'}}>
        <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
        >
            Products List Empty
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
           Currently no product exist.Try adding a new product.
        </Typography>
        <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
        >
            <Button variant="contained" onClick={()=>route.addproduct()} >Add a Product</Button>
            <Button variant="outlined" onClick={()=>route.landing()}>Go to landing page</Button>
        </Stack>
    </Container>
)}
export default EmptyList