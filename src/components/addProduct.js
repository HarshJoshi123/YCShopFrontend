import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useRoute from './useRoute';
import { login } from '../apis/user.js'
import Snack from './snackbar'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from 'react-redux'
import SelectLabels from './chipSelect';
import { addproduct } from '../apis/product'
const theme = createTheme();

export default function AddProduct() {
    const dispatch = useDispatch();
    const router = useRoute()
    // const [err1, setError1] = React.useState(false);

    const products = [
        'Bags',
        'Shoes',
        'Handbags',
        'Wristwatch',
        'Shirt',
        'Trousers',
        'T-Shirts',
        'Sunglasses'
    ];
    const category = ['Men', 'Women'];

    const [err2, setError2] = React.useState(null);

    const [file, setFile] = React.useState({
        name:'',
        file:null
    });

    const [uploadErr, setUploadErr] = React.useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            if (data.get("raised-button-file").size > 5000000) {
                setError2("Size should be less than 5 MB");
                setFile({
                    name:'',
                    file:null
                })
                
                document.getElementById("add").reset();
                return;
            }
            else if (!Boolean(data.get("name")) || !Boolean(data.get("cost")) ||  !Boolean(data.get("products")) || !Boolean(data.get("category"))) {
                setUploadErr({
                    message:"Fields cannot be empty",
                    severity:"error"
                });
                return;
            }
            else {
                console.log(file.path)
                let formData = new FormData();
                
                formData.append("name",data.get("name"));
                formData.append("description",data.get("description"));
                formData.append("category",data.get("category"));
                formData.append("cost",data.get("cost"));
                formData.append("product",data.get("products"));
                formData.append("photo",file.file);
                

                let res = await addproduct(formData);
                setUploadErr({
                    message:"Product successfully added",
                    severity:"success"
                });
                document.getElementById("add").reset();
            }
        }
        catch (err) {
            console.log(err);
            setUploadErr({
                message:"Internal Server Error",
                severity:"error"
            })
        }

    };


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" >
                {Boolean(uploadErr) ? <Snack err={uploadErr} setErr={setUploadErr} /> : ''}
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        //alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AddShoppingCartIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Product
                    </Typography>
                    <Box component="form" id="add" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            //helperText={err1 ? 'This product already exists' : ''}
                            autoFocus
                        //error={err1}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            label="Description"
                            type="text"
                            id="description"
                            //error={err2}
                            //helperText={err2 ? 'Incorrect password' : ''}
                            autoComplete="description"
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            autoComplete="Cost"
                            id="cost"
                            name="cost"
                            label="Cost"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        //onKeyPress = {(e)=>}
                        />
                        <SelectLabels options={products} id={'products'} />
                        <SelectLabels options={category} id={'category'} />
                        <Grid container>
                            <Grid item xs>
                                <input
                                    accept="image/*"
                                    //className={classes.input}
                                    onChange={(e) => { setFile({name:e.target.value,file:e.target.files[0]}); setError2(null) }}
                                    name="raised-button-file"
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="raised-button-file">
                                    <Button style={!err2 ? { border: '1px solid black' } : { color: 'red', border: '1px solid black' }} component="span" >
                                        {!err2 && !file.file ? 'Upload atleast one image *' : (err2 ? err2 : file.name)}
                                    </Button>
                                </label>
                            </Grid>

                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add
                        </Button>

                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}