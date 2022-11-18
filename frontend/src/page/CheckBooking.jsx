import React from 'react'
// import { Container, makeStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
import fetchFunc from '../services/fetchRequest'
// import HostedLists from '../components/HostedList'
import PropTypes from 'prop-types'
import ErrorPopup from '../components/errorPopupWindow';
// import errorPop from '../components/errorPopup';
import BookingRequest from '../components/BookingRequest'
import { useLocation } from 'react-router'

function CheckBooking () {
  // show all my booking
  const [bookingInfo, setBookingInfo] = React.useState([])
  const [fetchData, setFetchData] = React.useState(false)
  const location = useLocation()
  const listID = location.pathname.split('/')[2]
  // const [bookingList, setBookingList] = React.useState([])
  React.useEffect(() => {
    fetchFunc('/bookings', 'GET').then((response) => {
      if (response.status !== 200) {
        return
      }
      response.json().then((data) => {
        // setBookingInfo(data)
        const bookingList = []
        const listID = []
        const list = data.bookings
        for (let i = 0; i < list.length; i++) {
          bookingList.push(list[i])
          listID.push(list[i].listingId)
        }
        setBookingInfo(bookingList)
        // setlistingID(listID)
      })
    })
  }, [fetchData])
  // const [listingID, setlistingID] = React.useState([])
  const [list, setlist] = React.useState([])
  // get all the list
  React.useEffect(() => {
    fetchFunc('/listings', 'GET').then((response) => {
      if (response.status !== 200) {
        return
      }
      response.json().then((data) => {
        // console.log(data.listings)
        const allList = []
        const list = data.listings
        for (let i = 0; i < list.length; i++) {
          allList.push(list[i])
        }
        setlist(allList)
      })
    })
  }, [fetchData])
  // console.log('listingID', listingID)
  // const listIDOnly = listingID.map(item => JSON.parse(item))
  // const listTitle = []
  // for (let i = 0; i < listIDOnly.length; i++) {
  //   for (let j = 0; j < list.length; j++) {
  //     // let Image = { id: '', thumbnail: [] }
  //     if (list[j].id === listIDOnly[i]) {
  //       listTitle.push(list[j].title)
  //     }
  //   }
  // }
  // console.log('after', listTitle)
  // console.log('bookInfo', bookingInfo)
  console.log('list', list)
  console.log('listID', listID)
  const showList = []
  for (let i = 0; i < bookingInfo.length; i++) {
    if (listID === bookingInfo[i].listingId) {
      showList.push(bookingInfo[i])
    }
  }
  console.log('showList', showList)
  console.log('allBooking', bookingInfo)

  return (
    <React.Fragment>
      <Container >
        <ErrorPopup></ErrorPopup>
        {/* <BookingRequest list = {bookingInfo} listTitle = {listTitle} setFetchData = {setFetchData}></BookingRequest> */}
        <BookingRequest list = {showList} setFetchData = {setFetchData}></BookingRequest>
      </Container>
    </React.Fragment>
  );
}

export default CheckBooking;

CheckBooking.propTypes = {
  setShowAlert: PropTypes.any,
  setCurrentUser: PropTypes.any,
  currentUser: PropTypes.any,
}
