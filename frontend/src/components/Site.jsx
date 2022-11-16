import React from 'react';
// import Register from '../page/Register_delete';
// import Login from '../page/Login_delete';
import Dashboard from '../page/Dashboard';
import Login from '../page/Login';
import Register from '../page/Register';
import MyListing from '../page/MyListing';
import ListingNew from '../page/ListingNew';
import Edit from '../page/Edit';
import Booking from '../page/Booking';
import CheckBooking from '../page/CheckBooking'
import Publish from '../page/publishList'
import AllListing from '../page/AllListing';
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
  // const [currentUser, setCurrentUser] = React.useState(
  //   localStorage.getItem('user')
  // )
  // const currentUser = JSON.parse(localStorage.getItem('user'))
  // console.log(currentUser.email)
  React.useEffect(() => {
    const thisToken = localStorage.getItem('token');
    if (thisToken) {
      setToken(thisToken);
    }
  }, [])

  return (
    <div>
      <TopBar token={token}></TopBar>
      {/* {token && (
        <BigButton onClick={logoutBtn}>Logout</BigButton>
      )} */}
      <br/>

      <Switch>
        {/* LOGIN */}
        <Route path="/login">
          <Login setTokenFn={setToken} />
        </Route>
        {/* REGISTER */}
        <Route path="/register">
          <Register setTokenFn={setToken} />
        </Route>
        {/* DASHBOARD */}
        <Route path="/Dashboard">
          <Dashboard token={token} />
        </Route>
        {/* MYLISTING */}
        <Route path="/MyListing">
          <MyListing />
        </Route>
        {/* LISTING NEW LSIT */}
        <Route path="/listingNew">
          <ListingNew token={token}/>
        </Route>
        {/* EDIT PAGE */}
        <Route path="/Edit/:id">
          <Edit />
        </Route>
        {/* ALL LISTING PAGE */}
        <Route path="/AllListing">
          <AllListing />
        </Route>
        {/* CHECK BOOKING PAGE */}
        <Route path="/CheckBooking/:listID">
          <CheckBooking />
        </Route>
        {/* PUBLISH LIST PAGE */}
        <Route path="/publishLish/:listID">
          <Publish />
        </Route>
        {/* Booking PAGE */}
        <Route path="/Booking/:id">
          <Booking />
        </Route>
        <Route path="/">
          <b>Welcome</b>
        </Route>
      </Switch>
    </div>
  );
}

export default Site;
