import React from 'react'
// import { Container, makeStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
import fetchFunc from '../services/fetchRequest'
// import HostedLists from '../components/HostedList'
import PropTypes from 'prop-types'
import ErrorPopup from '../components/errorPopupWindow';
import errorPop from '../components/errorPopup';
import AvailableList from '../components/AvailableList'
import MyBookingList from '../components/MyBookingList'

// inital global part

// const useStyle = makeStyles((theme) => ({
//   container: {
//     paddingTop: theme.spacing(10)
//   }
// }));
function AllListing () {
  // const styles = useStyle();
  //  const id = useParms()
  // console.log(id)
  // const [response, setResponse] = React.useState(null)
  const [listings, setListings] = React.useState([])
  const [fetchData, setFetchData] = React.useState(false)
  const acceptID = []
  const publishList = []
  // show all the publish lists
  React.useEffect(() => {
    fetchFunc('/listings/', 'GET').then(response => {
      if (response.status !== 200) {
        const errorMessageInput = 'Can\'t get data';
        errorPop(errorMessageInput);
      }
      response.json().then((data) => {
        const list = data.listings
        for (let i = 0; i < list.length; i++) {
          // console.log(list[i].id)
          acceptID.push(list[i].id)
        }
        for (let i = 0; i < acceptID.length; i++) {
          // console.log('id', acceptID[i])
          const listID = acceptID[i]
          fetchFunc(`/listings/${listID}`, 'GET').then(response => {
            if (response.status !== 200) {
              const errorMessageInput = 'Can\'t get data';
              errorPop(errorMessageInput);
            }
            response.json().then((data) => {
              // setResponse(data.listing)
              const newData = { id: listID, ...data.listing }
              // console.log('all', newData)
              // if (newData.availability.length !== 0) {
              //   // console.log('some', newData)
              //   publishList.push(newData)
              // }
              // setListings(publishList)
              // ===================================
              publishList.push(newData)
              if (publishList.length === acceptID.length) {
                setListings(publishList)
              }
            })
          })
        }
      })
    })
  }, [fetchData])
  // show all my booking
  const [bookingInfo, setBookingInfo] = React.useState([])
  // const [bookingList, setBookingList] = React.useState([])
  const currentUser = JSON.parse(localStorage.getItem('user'))
  React.useEffect(() => {
    fetchFunc('/bookings', 'GET').then((response) => {
      if (response.status !== 200) {
        return
      }
      response.json().then((data) => {
        // setBookingInfo(data)
        const bookingList = []
        const list = data.bookings
        for (let i = 0; i < list.length; i++) {
          if (currentUser.email === list[i].owner) {
            // console.log(list[i].owner)
            bookingList.push(list[i])
          }
        }
        setBookingInfo(bookingList)
      })
    })
  }, [fetchData])
  // console.log('bookInfo', bookingInfo)

  return (
    <React.Fragment>
      <Container >
        <ErrorPopup></ErrorPopup>
        <MyBookingList lists = {bookingInfo} setFetchData={setFetchData}></MyBookingList>
        <AvailableList lists = {listings} bookInfo = {bookingInfo} setFetchData={setFetchData}></AvailableList>
      </Container>
    </React.Fragment>
  );
}

export default AllListing;

AllListing.propTypes = {
  setShowAlert: PropTypes.any,
  setCurrentUser: PropTypes.any,
  currentUser: PropTypes.any,
}
