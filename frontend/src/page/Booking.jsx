import PropTypes from 'prop-types';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory, useLocation } from 'react-router'
import fetchFunc from '../services/fetchRequest'
// import Context from '@mui/base/TabsUnstyled/TabsContext';
import ErrorPopup from '../components/errorPopupWindow';
import errorPop from '../components/errorPopup';
import { makeStyles, ImageList, ImageListItem } from '@material-ui/core'
// booking
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

function Copyright (props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        AirBrB.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  boldFont: {
    fontWeight: 'bold',
  },
}))

const getAllImage = (thumbnail) => {
  const allIMage = thumbnail.split(' ')
  allIMage.pop()
  return allIMage
}

const ChangeTimeToDate = (second) => {
  const date = new Date(second)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  if (month < 10) {
    month = '0' + month;
  }
  let day = date.getDate()
  if (day < 10) {
    day = '0' + date.getDate()
  }
  return `${day}/${month}/${year}`
}

const theme = createTheme();

export default function Booking () {
  const [lists, setLists] = React.useState([])
  const [fetchData, setFetchData] = React.useState(false)
  const styles = useStyles()
  const location = useLocation()
  const listID = location.pathname.split('/')[2]
  const publishList = []
  // bookingpart
  // console.log(listID)
  const [startTime, setStartTime] = React.useState(null)
  const [endTime, setEndTime] = React.useState(null)
  const [timeRanges, setTimeRanges] = React.useState([])
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const history = useHistory()
  console.log(currentUser)
  const handleStartTimeChange = (data) => {
    setStartTime(data)
  }
  const handleEndTimeChange = (data) => {
    setEndTime(data)
  }
  console.log(startTime, endTime)
  console.log('timeRange', timeRanges)
  // go back to listing
  const GoBackToListing = () => {
    history.push('/AllListing')
  };
  // get the details of this list
  React.useEffect(() => {
    fetchFunc(`/listings/${listID}`, 'GET').then(response => {
      if (response.status !== 200) {
        const errorMessageInput = 'Can\'t get data';
        errorPop(errorMessageInput);
      }
      response.json().then((data) => {
        // console.log(data.listing)
        // setLists(data.listing)
        const newData = { ...data.listing }
        publishList.push(newData)
        setLists(publishList)
      })
    })
  }, [fetchData])
  console.log('here', lists)

  // get image
  //   const getAllImage = (thumbnail) => {
  //     const allIMage = thumbnail.split(' ')
  //     allIMage.pop()
  //     return allIMage
  //   }
  // insertDate
  const insertDate = () => {
    console.log('insert')
    // if not fill all info
    if (!startTime || !endTime) {
      const errorMessageInput = 'Please fill up start date and end date';
      errorPop(errorMessageInput);
      return false
    }
    // change the date from date time to second time
    if (startTime > endTime) {
      const errorMessageInput = 'Start date must earler than end date';
      errorPop(errorMessageInput);
      return false
    }
    const allowDate = { start: startTime, end: endTime }
    if (timeRanges.length === 0) {
      setTimeRanges([allowDate])
    }
    setFetchData((preState) => !preState)
    // setStartTime(null)
    // setEndTime(null)
  }

  // delete set time
  const deleteTime = () => {
    timeRanges.pop()
    console.log('after delete', timeRanges)
    setFetchData((preState) => !preState)
  }

  // submit booking
  const submitBooking = () => {
    if (currentUser.email === lists[0].owner) {
      alert('You can not book your owner list')
      return false
    }
    // console.log(startTime, endTime)
    const dateRange = { start: startTime, end: endTime }
    const timeGap = endTime - startTime
    const rentDays = Math.floor(timeGap / (24 * 3600 * 1000)) + 1
    const totalPrice = rentDays * lists[0].price
    const data = { dateRange, totalPrice }
    console.log(data)
    fetchFunc(`/bookings/new/${listID}`, 'POST', data).then((response) => {
      if (response.status !== 200) {
        const errorMessageInput = 'Booking fault';
        errorPop(errorMessageInput);
      }
      if (response.status === 200) {
        const errorMessageInput = 'Booking succeeded';
        errorPop(errorMessageInput);
      }
    })
  }

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <RoomServiceIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Booking
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
              {lists.length !== 0 && (
                <Grid container spacing={3}>
                {lists.map((card) => (
                  <Grid item key={card}>
                    <div>
                      <ImageList cols={1}>
                        {getAllImage(card.thumbnail).map((imageBase64) => {
                          return (
                            <ImageListItem key={imageBase64}>
                              <img src={imageBase64} alt='Image of listings' />
                            </ImageListItem>
                          )
                        })}
                      </ImageList>
                  </div>
                  {/* title */}
                  <Typography
                        gutterBottom
                        variant='body2'
                        color='textPrimary'
                        align='center'
                      >
                        <span className={styles.boldFont}>Title:</span>
                        {` ${card.title}`}
                    </Typography>
                     {/* price */}
                     <Typography
                        variant='body2'
                        color='textPrimary'
                        align='center'
                      >
                        <span className={styles.boldFont}>Price:</span>
                        {` $${card.price} per night`}
                    </Typography>
                    {/* property */}
                    <Typography
                        variant='body2'
                        color='textPrimary'
                        align='center'
                        gutterBottom
                      >
                        <span className={styles.boldFont}>
                          Property type:
                        </span>
                        {card.metadata.entirePlace && (' Entire place')}
                        {card.metadata.privateRoom && (' Private room')}
                        {card.metadata.shareRoom && (' Share room')}
                    </Typography>
                    <Typography
                    variant='body2'
                    color='textPrimary'
                    align='center'
                    gutterBottom
                    >
                    <span className={styles.boldFont}>Available date:</span>
                    </Typography>
                    {card.availability.length === 0 && (<h4>No availability time</h4>)}
                    {card.availability.length !== 0 && (
                    <React.Fragment>
                      {card.availability.map((ele) => {
                        return (
                      <Typography
                      variant='body3'
                      color='red'
                      align='center'
                      gutterBottom
                      key={ele.start}>
                      <span >From</span>
                      {` ${ChangeTimeToDate(ele.start)} `}
                      <span >To</span>
                      {` ${ChangeTimeToDate(ele.end)}`}
                      </Typography>
                        )
                      })}
                    </React.Fragment>)}
                  </Grid>
                ))}
                </Grid>)}
              {/* booking part */}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container>
        <Typography component="h1" variant="h6" gutterBottom>
          <span>Tips: Set the time in this oreder(MM/DD/YYYY)</span>
        </Typography>
        {/* start day */}
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Choose Start Date (MM/DD/YEAR)"
                openTo="year"
                views={['year', 'month', 'day']}
                value={startTime}
                // onChange={(newValue) => {
                //   setValue(newValue);
                // }}
                onChange={handleStartTimeChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        {/* end day */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Choose End Date (MM/DD/YEAR)"
                openTo="year"
                views={['year', 'month', 'day']}
                value={endTime}
                // onChange={(newValue) => {
                //   setValue(newValue);
                // }}
                onChange={handleEndTimeChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        </Grid>
      </MuiPickersUtilsProvider>
        <Grid container>
          <Grid item xs={12}>
            <Button size='large' color='primary' onClick={insertDate} id='addData'>
                Add Date
            </Button>
          </Grid>
          {/* display select date */}
          <Grid item xs={12}>
            <Typography>You have select:</Typography>
            {timeRanges.length === 0 && (<h4>Please selet date</h4>)}
            {timeRanges.length !== 0 && (
            <React.Fragment>
                {timeRanges.map((ele) => {
                  return (
                <Typography key={ele.start}>
                <span >From</span>
                {` ${ChangeTimeToDate(ele.start)} `}
                <span >To</span>
                {` ${ChangeTimeToDate(ele.end)}`}
                </Typography>
                  )
                })}
            </React.Fragment>)}
          </Grid>
          {/* delete set date */}
          <Grid item xs={12}>
            <Button size='large' color='primary' onClick={deleteTime} id='addData'>
                Delete set date
            </Button>
          </Grid>
        </Grid>
            <Button
              // variant="contained"
              color='secondary'
              sx={{ mt: 3, mb: 2 }}
              onClick={submitBooking}
            >
              submit booking
            </Button>
            {/* back to publish list page */}
            <Button
              type="submit"
              fullWidth
              color='primary'
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={GoBackToListing}
            >
              Back to Publish Listing
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

Booking.propTypes = {
  setTokenFn: PropTypes.func,
};
