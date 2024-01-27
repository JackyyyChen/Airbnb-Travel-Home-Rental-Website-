import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// import BigButton from './bigButton';
import Button from '@mui/material/Button';
// import LogOut from './LogOut'
import fetchFunc from '../services/fetchRequest';
// import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  searchBar: {
    border: '0.5px solid black',
    borderRadius: 10,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'black',
  },
  textColor: {
    color: '#232222',
    textDecoration: 'none'
  }
});

const Search = styled('div')(({ theme }) => ({
  position: 'sticky',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 30,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    color: 'black'
  },
}));

export default function PrimarySearchAppBar (props) {
  const styles = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleSearch = (event) => {
    const searchContent = event.target.value
    console.log(searchContent)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // const sayHello = () => {
  //   console.log('Hello');
  // }
  // console.log(localStorage.getItem('token'));
  let [token, setToken] = React.useState(null);
  const history = useHistory();
  const { pathname } = useLocation();
  React.useEffect(() => {
    const thisToken = localStorage.getItem('token');
    // console.log('ThisToken', thisToken);
    if (thisToken) {
      setToken(thisToken);
      token = thisToken;
    }
  }, [props.token])
  // console.log('Token', token);
  // console.log('props.token', props.token);
  const logoutBtn = async () => {
    await fetchFunc('/user/auth/logout', 'POST')
    // const data = await response.json();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    // console.log('Token', token);
    // console.log('props.token', props.token);
    // console.log(localStorage.getItem('token'));
  }
  React.useEffect(() => {
    if (token !== null) {
      if (pathname === '/login' || pathname === '/register') {
        history.push('/AllListing');
      }
    } else if (token === null) {
      // if (pathname === '/Dashboard' || pathname === '/MyListing' || pathname === '/listingNew' || pathname === '/AllListing' || pathname === '/Booking' || pathname === '/CheckBooking') {
      //   history.push('/login');
      // }
      if (pathname !== '/login') {
        history.push('/login');
      }
    }
  }, [token]);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      <span>
        <Link
        to="/MyListing"
        className={styles.textColor}
        >
          <IconButton
          size="large"
          aria-label="Notifications"
          sx={{ color: '#232222' }}>
            <HomeWorkOutlinedIcon />
          </IconButton>MyListingPage
        </Link>
      </span>
      </MenuItem>
      {/* Listing New */}
      <MenuItem>
      <span>
        <Link
        to="/listingNew"
        className={styles.textColor}
        >
          <IconButton
          size="large"
          aria-label="Notifications"
          sx={{ color: '#232222' }}>
            <NoteAddIcon />
          </IconButton>ListingNew
        </Link>
      </span>
      </MenuItem>
      {/* All listing in publish */}
      <MenuItem>
      <span>
      <Link
      to="/AllListing"
      className={styles.textColor}
      >
        <IconButton
        size="large"
        aria-label="Notifications"
        sx={{ color: '#232222' }}>
          <TravelExploreIcon />
        </IconButton>Published lists</Link></span>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
      position="static"
      sx={{
        bgcolor: '#FFFFFF',
        boxShadow: 'none',
        height: '70px',
        minWidth: 300,
        position: 'fixed',
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}>
        <Toolbar>
          <Box sx={{ display: { xs: 'flex', sm: 'none', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="#232222"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' } }}>
            {/* ###################################### */}
            <span><Link to="/MyListing" variant="body2">
            {/* my listing */}
            <IconButton
            size="large"
            aria-label="Notifications"
            sx={{ color: '#232222' }}>
              <HomeWorkOutlinedIcon />
            </IconButton></Link></span>
            {/* Listing new */}
            <span><Link to="/listingNew" variant="body2">
            <IconButton
            size="large"
            aria-label="Notifications"
            sx={{ color: '#232222' }}>
              <NoteAddIcon />
            </IconButton></Link></span>
            {/* All listing in publish */}
            <span><Link to="/AllListing" variant="body2">
              <IconButton
              size="large"
              aria-label="Notifications"
              sx={{ color: '#232222' }}>
                <TravelExploreIcon />
              </IconButton></Link></span>
            {/* ###################################### */}
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon
              sx={{ color: '#232222' }}/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              className={styles.searchBar}
              type='text'
              name='searchContent'
              onChange={handleSearch}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
            {!token && (
              <>
                <span>
                <Link
                to="/login"
                className={styles.textColor}
                >Login
                </Link>
                </span>
                <span className={styles.textColor}>&nbsp;|&nbsp;</span>
                <span>
                <Link
                to="/register"
                className={styles.textColor}
                >
                Register
                </Link></span>
              </>
            )}
            {token && (
              // <BigButton onClick={logoutBtn}>Logout</BigButton>
              <Button
              onClick={logoutBtn}
              sx={{ m: 1, bgcolor: '#DC0F62', color: 'white' }}
              >Logout</Button>
            )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

PrimarySearchAppBar.propTypes = {
  token: PropTypes.string,
  logout: PropTypes.func,
};
