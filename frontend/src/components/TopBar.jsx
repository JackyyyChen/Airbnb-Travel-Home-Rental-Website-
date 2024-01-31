import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import fetchFunc from '../services/fetchRequest';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { makeStyles } from '@material-ui/core'
import errorPop from './errorPopup';
import Paper from '@mui/material/Paper';

// import TextField from '@mui/material/TextField';

const useStyles = makeStyles({
  searchBar: {
    border: '0.5px solid black',
    borderRadius: 10,
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
  // 前端自适应
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
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
      if (pathname !== '/login') {
        history.push('/login');
      }
    }
  }, [token]);
  // 初始化list
  const [lists, setLists] = useState({ data: [] });
  const [fetchData] = React.useState(false)
  React.useEffect(() => {
    fetchFunc('/listings/', 'GET').then(response => {
      if (response.status !== 200) {
        const errorMessageInput = 'Can\'t get data';
        errorPop(errorMessageInput);
      }
      response.json().then(json => {
        setLists(json); // 假设json的格式类似于上面的例子
      })
    })
  }, [fetchData]);
  // 添加搜索词的状态
  // const searchList = []
  // for (let i = 0; i < lists.listings.length; i++) {
  //   let temp = { id: '', title: '' }
  //   temp = { id: lists[i].id, title: lists[i].title }
  //   searchList.push(temp)
  // }
  // console.log(searchList)
  const SearchResults = styled('div')({
    position: 'absolute',
    width: '100%', // 或者根据需要调整宽度
    zIndex: 1000, // 确保足够高，以显示在其他内容之上
    color: 'black',
    // 其他样式...
  });
  const CustomMenuItem = styled(MenuItem)({
    color: 'black', // 设置文本颜色为黑色
  });
  // go to booking page
  const GoToBooking = (e) => {
    console.log('gotoedit');
    const itemId = e.currentTarget.getAttribute('data-id'); // 获取 data-id 属性的值
    console.log(itemId);
    history.push(`/Booking/${itemId}`)
  }
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  // 模拟的静态数据
  // const mockData = [
  //   { id: 1, name: 'ab' },
  //   { id: 2, name: 'bb' },
  //   { id: 3, name: 'cc' },
  //   // ... 其他数据
  // ];
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // 过滤模拟数据以找到匹配项
    const filteredResults = lists.listings.filter(item =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filteredResults);
  };
  console.log('Lists:', lists);
  console.log('Search Term:', searchTerm);
  console.log('results:', results);
  // // 过滤逻辑
  // const filteredListings = listings.data && Array.isArray(listings.data)
  //   ? listings.data.filter(listing => {
  //     const titleStr = String(listing.title); // 确保title是字符串
  //     // console.log('title: ', titleStr)
  //     return titleStr.toLowerCase().includes(searchTerm.toLowerCase());
  //   })
  //   : [];
  // console.log('Filtered Results:', filteredListings);
  // search bar content
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ zIndex: 1100 }}
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
        sx={{ zIndex: 1100 }}
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
            <HomeWorkOutlinedIcon/>
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
            <NoteAddIcon/>
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
          <TravelExploreIcon/>
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
                                <MoreIcon/>
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
              <HomeWorkOutlinedIcon/>
            </IconButton></Link></span>
                            {/* Listing new */}
                            <span><Link to="/listingNew" variant="body2">
            <IconButton
                size="large"
                aria-label="Notifications"
                sx={{ color: '#232222' }}>
              <NoteAddIcon/>
            </IconButton></Link></span>
                            {/* All listing in publish */}
                            <span><Link to="/AllListing" variant="body2">
              <IconButton
                  size="large"
                  aria-label="Notifications"
                  sx={{ color: '#232222' }}>
                <TravelExploreIcon/>
              </IconButton></Link></span>
                            {/* ###################################### */}
                        </Box>
                        <div>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon
                                        sx={{ color: '#232222' }}/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    className={ styles.searchBar}
                                    type='text'
                                    name='searchContent'
                                    onChange={handleSearch}
                                />
                                {searchTerm && (
                                    <SearchResults>
                                        <Paper>
                                            {results.map(item => (
                                                <CustomMenuItem
                                                    key={item.id}
                                                    // name={item.id}
                                                    data-id={item.id} // 使用 data-id 属性传递 id
                                                    onClick={GoToBooking}
                                                >
                                                    {item.title}
                                                </CustomMenuItem>
                                            ))}
                                        </Paper>
                                    </SearchResults>
                                )}
                            </Search>
                        </div>
                        {/* +++++++++++++++++++++++++++++++++++ */}
                        <Box sx={{ flexGrow: 1 }}/>
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
