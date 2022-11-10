import React from 'react';
// import Register from '../page/Register_delete';
// import Login from '../page/Login_delete';
import Dashboard from '../page/Dashboard';
import Login from '../page/Login';
import Register from '../page/Register';
import CurrentListing from '../page/CurrentListing';
import ListingNew from '../page/ListingNew';
// import fetchFunc from '../services/fetchRequest';
// import BigButton from './bigButton';
import TopBar from './TopBar';
// import logoutBtn from './LogOut'
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // Redirect,
  // useHistory,
  // useLocation
} from 'react-router-dom';

function Site () {
  const [token, setToken] = React.useState(null);
  // const history = useHistory();
  // const { pathname } = useLocation();
  // console.log(location);
  // console.log(localStorage.getItem('token'));
  React.useEffect(() => {
    const thisToken = localStorage.getItem('token');
    if (thisToken) {
      setToken(thisToken);
    }
  }, [])

  console.log('+++', token);
  // React.useEffect(() => {
  //   if (token !== null) {
  //     if (pathname === '/login' || pathname === '/register') {
  //       history.push('/Dashboard');
  //     }
  //   } else if (token === null) {
  //     if (pathname === '/Dashboard' || pathname === '/currentListing' || pathname === '/listingNew') {
  //       history.push('/login');
  //     }
  //   }
  // }, [token]);

  // const logoutBtn = async () => {
  //   const response = await fetchFunc('/user/auth/logout', 'POST')
  //   const data = await response.json();
  //   localStorage.removeItem('token');
  //   setToken(null);
  //   console.log(data.token);
  // }

  return (
    <div>
      <TopBar token={token}></TopBar>
      {/* {token && (
        <BigButton onClick={logoutBtn}>Logout</BigButton>
      )} */}
      <br/>

      <Switch>
        <Route path="/login">
          <Login setTokenFn={setToken} />
        </Route>
        <Route path="/register">
          <Register setTokenFn={setToken} />
        </Route>
        <Route path="/Dashboard">
          <Dashboard token={token} />
        </Route>
        <Route path="/currentListing">
          <CurrentListing token={token}/>
        </Route>
        <Route path="/listingNew">
          <ListingNew token={token}/>
        </Route>
        <Route path="/">
          <b>Welcome</b>
        </Route>
      </Switch>
    </div>
  );
}

export default Site;
