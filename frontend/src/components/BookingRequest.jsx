import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types'
import CardContent from '@mui/material/CardContent';
import { makeStyles, Modal } from '@material-ui/core';
import fetchFunc from '../services/fetchRequest'
import ErrorPopup from '../components/errorPopupWindow';
import errorPop from '../components/errorPopup';
import { useHistory } from 'react-router'

function Copyright () {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  icons: {
    paddingRight: theme.spacing(2),
  },
  gridContainer: {
    marginBottom: theme.spacing(3),
  },
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  boldFont: {
    fontWeight: 'bold',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
}))

function getModalStyle () {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
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

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function BookingRequest (props) {
  const list = props.list
  const listTitle = props.listTitle
  const setFetchData = props.setFetchData
  const [modalStyle] = React.useState(getModalStyle)
  const [bookingID, setBookingID] = React.useState('')
  const [openAcceptModal, setOpenAcceptModal] = React.useState(false)
  const [openRejectModal, setOpenRejectModal] = React.useState(false)
  const styles = useStyles()
  const history = useHistory()
  console.log(list, listTitle)
  console.log(bookingID)
  // Open accept window
  const OpenAcceptWindow = (e) => {
    setBookingID(e.currentTarget.name)
    setOpenAcceptModal(true)
  }
  // Close accept window
  const CloseAcceptWindow = (e) => {
    setOpenAcceptModal(false)
  }
  // Confirm Accept
  const ConfirmAccept = () => {
    console.log(bookingID)
    fetchFunc(`/bookings/accept/${bookingID}`, 'PUT').then((response) => {
      if (response.status !== 200) {
        const errorMessageInput = 'accept fault';
        errorPop(errorMessageInput);
      }
      setFetchData((preState) => !preState)
      const errorMessageInput = 'You have ACCEPT this booking!';
      errorPop(errorMessageInput);
      setOpenAcceptModal(false)
    })
  }
  // Open reject window
  const OpenRejectWindow = (e) => {
    setBookingID(e.currentTarget.name)
    setOpenRejectModal(true)
  }
  // Close accept window
  const CloseRejectWindow = (e) => {
    setOpenRejectModal(false)
  }
  // Confirm Accept
  const ConfirmReject = () => {
    console.log(bookingID)
    fetchFunc(`/bookings/decline/${bookingID}`, 'PUT').then((response) => {
      if (response.status !== 200) {
        const errorMessageInput = 'Reject fault';
        errorPop(errorMessageInput);
      }
      setFetchData((preState) => !preState)
      const errorMessageInput = 'You have REJECT this booking!';
      errorPop(errorMessageInput);
      setOpenRejectModal(false)
    })
  }
  // go back to listing
  const GoBackToMyListing = () => {
    history.push('/MyListing')
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Booking Requests
            </Typography>
          </Container>
          <ErrorPopup></ErrorPopup>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          {list.length === 0 && (
          <Grid container>
            <Grid item xs={12} align='center'>
              <Typography variant='h5'>Loading...</Typography>
              <Typography variant='body1'>
                (If loading time too long, Maybe you do not have a booking request...)
              </Typography>
            </Grid>
          </Grid>
          )}
          {list.length !== 0 && (
          <Grid container spacing={4}>
            {list.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* listId */}
                    <Typography
                        variant='body2'
                        color='textPrimary'
                        align='center'
                      >
                        <span className={styles.boldFont}>listingId:</span>
                        {` ${card.listingId}`}
                    </Typography>
                    {/* bookingID */}
                    <Typography
                        variant='body2'
                        color='textPrimary'
                        align='center'
                      >
                        <span className={styles.boldFont}>BookingID:</span>
                        {` ${card.id}`}
                    </Typography>
                    {/* booking owner */}
                    <Typography
                        variant='body2'
                        color='textPrimary'
                        align='center'
                      >
                        <span className={styles.boldFont}>Booking user:</span>
                        {` ${card.owner}`}
                    </Typography>
                    {/* booking date */}
                    <Typography
                      variant='body2'
                      color='textPrimary'
                      align='center'
                    ><span className={styles.boldFont}>Available date:</span></Typography>
                      <Typography>
                      <span >From</span>
                      {` ${ChangeTimeToDate(card.dateRange.start)} `}
                      <span >To</span>
                      {` ${ChangeTimeToDate(card.dateRange.end)}`}
                      </Typography>
                    {/* price */}
                    <Typography
                        variant='body2'
                        color='textPrimary'
                        align='center'
                      >
                        <span className={styles.boldFont}>Total Price:</span>
                        {` $${card.totalPrice}`}
                    </Typography>
                    {/* booking status */}
                    <Typography
                        variant='body2'
                        color='textPrimary'
                        align='center'
                      >
                        <span className={styles.boldFont}>Booking status:</span>
                        {` ${card.status}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                {/* accept this booking */}
                    <Button
                    size="small"
                    name={card.id}
                    onClick={OpenAcceptWindow}
                    >
                    Accept
                    </Button>
                {/* refuse this booking */}
                    <Button
                    size="small"
                    color='secondary'
                    name={card.id}
                    onClick={OpenRejectWindow}
                    >
                    denial
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          )}
        </Container>
      </main>
      {/* accept modal */}
      <Modal
        open={openAcceptModal}
        onClose={CloseAcceptWindow}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div style={modalStyle} className={styles.paper}>
          <h3>Do you want to ACCEPT this booking?</h3>
          <Button
          size='large'
          color='primary'
          onClick={ConfirmAccept}>
            Yes
          </Button>
          <Button
            size='large'
            color='secondary'
            onClick={CloseAcceptWindow}
          >
            No
          </Button>
        </div>
      </Modal>
      {/* accept modal */}
      <Modal
        open={openRejectModal}
        onClose={CloseRejectWindow}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div style={modalStyle} className={styles.paper}>
          <h3>Do you want to REJECT this booking?</h3>
          <Button
          size='large'
          color='primary'
          onClick={ConfirmReject}
          >
            Yes
          </Button>
          <Button
            size='large'
            color='secondary'
            onClick={CloseRejectWindow}
          >
            No
          </Button>
        </div>
      </Modal>
      <Box component="form" onSubmit={GoBackToMyListing} noValidate sx={{ mt: 1 }}>
        <Button
          type="submit"
          fullWidth
          color='primary'
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Back to My Listing
        </Button>
      </Box>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

BookingRequest.propTypes = {
  list: PropTypes.any,
  listTitle: PropTypes.any,
  setFetchData: PropTypes.any,
}
