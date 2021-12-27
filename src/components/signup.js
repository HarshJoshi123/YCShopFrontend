import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useRoute from './useRoute'
import { signup } from '../apis/user.js'
import Snack from './snackbar'
function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

  const [err1, setError1] = React.useState(false);
  const [err2, setError2] = React.useState(false);
  const [errF, setErrorF] = React.useState(false);
  const [errL, setErrorL] = React.useState(false);
  const [signupErr,setSignupErr] = React.useState(null);

  const router = useRoute()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,30}$/;
    let errors = {
      err1: !String(data.get('email'))
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      err2: !data.get('password').match(paswd),
      errF: data.get('firstName').replace(/ /g, "").length < 2,
      errL: data.get('lastName').replace(/ /g, "").length < 2
    }
    setError1(errors.err1)
    setError2(errors.err2);
    setErrorF(errors.errF)
    setErrorL(errors.errL)
    
    errors = Object.values(errors);
    for(let i=0;i<errors.length;i++){
      if(errors[i]==true){
        return ;
      }
    }
  
    let signData = {
      email: data.get('email'),
      password: data.get('password'),
      name: data.get('firstName') + ' ' + data.get('lastName'),
      invitation: Boolean(data.get("check"))   
    }
    try {
      let resp = await signup(signData)
      setSignupErr({
        severity:"success",
        message:"Signup successfull"
      });
      document.getElementById("sign").reset();
    }
    catch (err) {
      setSignupErr({
        severity:"error",
        message:err.response.data.err
      });
     // console.log(err.response.data.err);
    }
  };
  console.log(signupErr)
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
       {Boolean(signupErr) ? <Snack err={signupErr} setErr={setSignupErr} /> : ''}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" id="sign" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={errF}
                  helperText={errF ? 'Enter first name' : ''}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  error={errL}
                  helperText={errL ? 'Enter Last name' : ''}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  error={err1}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={err1 ? 'Enter valid email address' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  error={err2}
                  id="password"
                  helperText={err2 ? 'Password should have 1 special character,1 digit and 7 to 30 characters' : ''}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel          
                  control={<Checkbox id="check" name="check" value="true" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={() => router.login()}>
                  Already have an account? Sign in
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
