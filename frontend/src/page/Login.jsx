import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import fetchFunc from '../services/fetchRequest'
import ErrorPopup from '../components/errorPopupWindow';
import errorPop from '../components/errorPopup';

function Copyright (props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {/* <Link color="inherit" href="#">
        Your Website
      </Link>{' '} */}
      <Link to="/login" variant="body2">myWebsite</Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn (props) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const info = new FormData(event.currentTarget);
    const userInfo = { email: info.get('email'), password: info.get('password') }
    console.log(userInfo);
    const response = await fetchFunc('/user/auth/login', 'POST', userInfo)
    const data = await response.json();
    if (data.error) {
      // alert(data.error);
      const errorMessageInput = data.error;
      errorPop(errorMessageInput);
    } else {
      props.setTokenFn(data.token);
      // console.log(data.token);
      const userData = { token: data.token, email: info.get('email') }
      console.log(userData);
      console.log(userData.email);
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', data.token);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ErrorPopup></ErrorPopup>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#DC0F62' }}>
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
              autoFocus
              // value='jacky@unsw'
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              // value='chen1178'
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#DC0F62' }}
            >
              Sign In
            </Button>
                <Link to="/register" variant="body2" >
                  {"Don't have an account? Sign Up"}
                </Link>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

SignIn.propTypes = {
  setTokenFn: PropTypes.func,
};
