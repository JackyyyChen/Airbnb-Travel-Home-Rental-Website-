import React from 'react'
// import { Container, makeStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
import fetchFunc from '../services/fetchRequest'
import PropTypes from 'prop-types'
import ErrorPopup from '../components/errorPopupWindow';
import errorPop from '../components/errorPopup';
import HostedLists from '../components/HostedList';

function Hosted () {
  // const styles = useStyle();
  const [listings, setListings] = React.useState([])
  const [fetchData, setFetchData] = React.useState(false)
  const currentUser = JSON.parse(localStorage.getItem('user'))
  // console.log(currentUser.email)
  // const currentUser = 'hello'
  React.useEffect(() => {
    fetchFunc('/listings', 'GET').then(response => {
      if (response.status !== 200) {
        // showAlertMsg('error', 'Can\'t get data')
        // return
        const errorMessageInput = 'Can\'t get data';
        errorPop(errorMessageInput);
      }
      response.json().then((data) => {
        const detailListings = []
        const ownerListings = []
        const list = data.listings
        for (let i = 0; i < list.length; i++) {
          if (currentUser.email === list[i].owner) {
            ownerListings.push(list[i])
          }
        }
        console.log('###', ownerListings)
        for (let i = 0; i < ownerListings.length; i++) {
          const listId = ownerListings[i].id
          fetchFunc(`/listings/${listId}`, 'GET').then(response => {
            if (response.status !== 200) {
              return
            }
            response.json().then((data) => {
              const newData = { id: listId, ...data.listing }
              detailListings.push(newData)
              if (detailListings.length === ownerListings.length) {
                setListings(detailListings)
              }
            })
          })
        }
      })
    })
  }, [fetchData])
  console.log('Mylisting', listings)

  return (
    <React.Fragment>
      <Container >
        <ErrorPopup></ErrorPopup>
        <HostedLists lists = {listings} setFetchData={setFetchData}></HostedLists>
      </Container>
    </React.Fragment>
  );
}

export default Hosted;

Hosted.propTypes = {
  setCurrentUser: PropTypes.any,
  currentUser: PropTypes.any,
}
