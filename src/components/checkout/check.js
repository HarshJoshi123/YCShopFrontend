import * as React from 'react';
import { CssBaseline, AppBar, Box, Container, Toolbar, Paper, Stepper, Step, StepLabel, Button, Link, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './address';
import PaymentForm from './form';
import Review from './review';
// import {loadStripe} from '@stripe/stripe-js';
// import {Elements} from '@stripe/react-stripe-js'

// const PUBLIC_KEY = "pk_test_51KBZ5oSGJi7bktEYwbGaBLZS2zMLjOUQtwM3L3utJScIUlcDIoQ0uA6jwTTyzlCOzMu1ulYW0cGGwBFvEZTXAGjW00YOHrAUg6"

// export  function StripeContainer(){
//     const [stripe,setStripe] = React.useState('');
//  React.useEffect(async ()=>{

//     const st = await loadStripe(PUBLIC_KEY);
//     setStripe(st);
//  },[])
//  if(stripe == ''){
//      return <div>LOADING ..... </div>
//  }  

//  return( 
//    <Elements stripe={stripe}>
//       <PaymentForm/> 
//    </Elements>
//    )
// }




function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Shipping address', 'Payment details'];

function getStepContent(step, addressData, setAddressData,paid,setPaid) {

    switch (step) {
        case 0:
            return <AddressForm data={addressData} setData={setAddressData} />;
        case 1:
            return <Review address={addressData} paid={paid} setPaid={setPaid} />;
        default:
            throw new Error('Unknown step');
    }
}

const theme = createTheme();

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    
    const [addressData, setAddressData] = React.useState({
        fname: '',
        lname: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    })
    
    const [paid ,setPaid ] = React.useState(false);
    
    const handleNext = () => {
        setActiveStep(activeStep + 1);
        console.log(addressData)
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const length = (st) => st.replace(/ /g, "").length

    const canMove = () => {

        return (length(addressData.address1) > 8 || length(addressData.address2) > 8) &&
            length(addressData.fname) >= 2 && length(addressData.lname) >= 2 &&
            length(addressData.city) >= 1 && length(addressData.zip) >= 5 && length(addressData.country) >= 4
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" align="center" noWrap style={{ width: '100%' }}>
                        To YCShop Pvt Ltd.
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        {activeStep == steps.length - 2 && canMove() &&
                            < Button
                                style={{ paddingLeft: 'auto' }}
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                Next
                            </Button>
                        }
                        {activeStep == steps.length - 1 &&
                            < Button
                                style={{ float: 'right' }}
                                onClick={handleBack}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                Back
                            </Button>
                        }
                    </div>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #2001539. We have emailed your order
                                    confirmation, and will send you an update when your order has
                                    shipped.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep, addressData, setAddressData,paid,setPaid)}

                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Copyright />
            </Container>
        </ThemeProvider >
    );
}