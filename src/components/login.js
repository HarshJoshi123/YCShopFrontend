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
import useRoute from './useRoute';
import { login } from '../apis/user.js'
import Snack from './snackbar'
import { useDispatch } from 'react-redux'
import GitHubIcon from '@mui/icons-material/GitHub';

function Copyright(props) {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/" style={{ textDecoration: 'none' }}>
          YourCornerShop
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        Made by Harsh Joshi <a href="https://github.com/HarshJoshi123" target="_blank">
          <GitHubIcon />
        </a>
      </Typography>
    </>
  );
}

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const router = useRoute()
  const [err1, setError1] = React.useState(false);
  const [err2, setError2] = React.useState(false);
  const [loginErr, setLoginErr] = React.useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,30}$/;
    const errors = {
      err1: !String(data.get('email'))
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      err2: !data.get('password').match(paswd)
    }
    setError1(errors.err1);
    setError2(errors.err2);

    if (errors.err1 || errors.err2) {
      return;
    }

    try {
      let res = await login({
        email: data.get("email"),
        password: data.get("password")
      })
      console.log(res.data);
      dispatch({
        type: 'LOGIN', data: {
          name: res.data.user.name,
          token: res.data.token,
          email: res.data.user.email,
          _id: res.data.user._id
        }
      });



      setLoginErr({
        message: "Login Successfull",
        severity: "success"
      })
      router.landing();
    }
    catch (err) {
      setLoginErr({
        message: err.response ? err.response.data.err : 'INTERNAL SERVER ERROR',
        severity: "error"
      })
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {Boolean(loginErr) ? <Snack err={loginErr} setErr={setLoginErr} /> : ''}
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              helperText={err1 ? 'Incorrect email' : ''}
              autoFocus
              error={err1}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={err2}
              helperText={err2 ? 'Incorrect password' : ''}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Button onClick={() => router.signup()}>
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}