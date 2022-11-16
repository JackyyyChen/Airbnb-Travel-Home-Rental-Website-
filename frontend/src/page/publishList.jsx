import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory, useLocation } from 'react-router'
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { Grid } from '@material-ui/core'
import fetchFunc from '../services/fetchRequest'
// trying
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import ErrorPopup from '../components/errorPopupWindow';
import errorPop from '../components/errorPopup';
import PropTypes from 'prop-types'

function Copyright (props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function publish () {
  const [startTime, setStartTime] = React.useState(null)
  const [endTime, setEndTime] = React.useState(null)
  const [timeRanges, setTimeRanges] = React.useState([])
  const [fetchData, setFetchData] = React.useState(false)
  // go back to listing
  const GoBackToListing = () => {
    history.push('/MyListing')
  };

  const handleStartTimeChange = (data) => {
    setStartTime(data)
  }

  const handleEndTimeChange = (data) => {
    setEndTime(data)
  }

  // insertDate
  const insertDate = () => {
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
    const sortList = []

    let startIndex = 0
    let endIndex = 0
    if (timeRanges.length === 0) {
      setTimeRanges([allowDate])
    } else {
      timeRanges.forEach((ele) => {
        sortList.push(ele.start)
        sortList.push(ele.end)
      })
      console.log('before', sortList)
      // 再加一个startTime后的位置
      for (let i = 0; i < sortList.length; i++) {
        if (startTime === sortList[i]) {
          startIndex = i
        }
        if (i === sortList.length - 1) {
          startIndex = sortList.length
        }
      }
      sortList.splice(startIndex, 0, startTime)
      // 再加一个endTime后的位置
      for (let j = 0; j < sortList.length; j++) {
        if (j === sortList.length - 1) {
          endIndex = sortList.length
        }
      }
      sortList.splice(endIndex, 0, endTime)
      console.log('after', sortList)
      console.log('startIdx', startIndex)
      console.log('endIdx', endIndex)
      const addNewDate = sortList.slice(0, startIndex)
      console.log('addNewDate', addNewDate)
      const newDateRanges = []
      for (let i = 0; i < addNewDate.length; i += 2) {
        const newDate = { start: addNewDate[i], end: addNewDate[i + 1] }
        newDateRanges.push(newDate)
      }
      newDateRanges.push(allowDate)
      setTimeRanges(newDateRanges)
      setFetchData(fetchData)
    }
    setStartTime(null)
    setEndTime(null)
  }

  // delete set time
  const deleteTime = () => {
    timeRanges.pop()
    console.log('after delete', timeRanges)
    setFetchData((preState) => !preState)
  }

  // change time to Date
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

  const history = useHistory()
  const location = useLocation()
  const listID = location.pathname.split('/')[2]
  // console.log(listID)

  // submit publish list
  const publishList = () => {
    if (timeRanges.length === 0) {
      const errorMessageInput = 'You need to chose one or more date to publish';
      errorPop(errorMessageInput);
      return false
    }
    const data = { availability: [...timeRanges] }
    fetchFunc(`/listings/publish/${listID}`, 'PUT', data).then(
      (response) => {
        if (response.status !== 200) {
          const errorMessageInput = 'Can\'t publish this list';
          errorPop(errorMessageInput);
        }
        const errorMessageInput = 'Publish this list successfully';
        errorPop(errorMessageInput);
      }
    )
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
          }}
        >
          <Typography variant="h6">
          Choose time range to live
          </Typography>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container>
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
              <>
              <Grid container>
                <Grid item xs={12}>
                    <Button size='large' color='primary' onClick={insertDate} id='addData'>
                        Add Date
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Available date:</Typography>
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
                <Grid item xs={12}>
                  <Button onClick={deleteTime}>Delete last setting date</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button size='large' color='secondary' onClick={publishList} id='FinishPublish'>
                        Publish
                    </Button>
                </Grid>
                </Grid>
              </>
          </div>
          <Box component="form" onSubmit={GoBackToListing} noValidate sx={{ mt: 1 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Back to listing
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

publish.propTypes = {
  setFetchData: PropTypes.any,
}
